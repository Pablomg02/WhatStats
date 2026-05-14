import { describe, expect, it } from 'vitest';
import { parseWhatsAppTxt } from './index';

const sampleIndividual = `24/5/21, 15:18 - Los mensajes y las llamadas están cifrados de extremo a extremo. Solo las personas en este chat pueden leerlos, escucharlos o compartirlos. *Más información*
24/5/21, 15:18 - Alice: Hola Bob
24/5/21, 15:18 - Alice: Tenía una duda con lo de los cambios en los exámenes
24/5/21, 15:55 - Bob: Holis
16/11/21, 14:53 - Bob: <Multimedia omitido>
`;

const sampleGroup = `4/4/26, 20:31 - ‎Carlos Ruiz creó el grupo "Grupo Amigos 2026".
4/4/26, 20:34 - ‎Carlos Ruiz añadió a Diana López.
4/4/26, 20:35 - Carlos Ruiz: Ya estamos todos
4/4/26, 20:35 - Eva: Hola Carlos!
5/4/26, 10:31 - Eva: ENCUESTA:
Cuál es tu película favorita del año?
OPCIÓN: Ciencia ficción (‎1 voto)
OPCIÓN: Comedia (‎8 votos)
OPCIÓN: Drama (‎2 votos)

5/4/26, 15:19 - Carlos Ruiz: Se eliminó este mensaje.
`;

describe('parseWhatsAppTxt - individual', () => {
  const ds = parseWhatsAppTxt(sampleIndividual);

  it('detecta el aviso E2E como sistema', () => {
    expect(ds.mensajes[0].isSystem).toBe(true);
    expect(ds.mensajes[0].systemEvent?.kind).toBe('e2e-notice');
  });

  it('parsea mensajes de usuario', () => {
    expect(ds.userMessages.length).toBe(4);
    expect(ds.userMessages[0].autor).toBe('Alice');
    expect(ds.userMessages[0].mensaje).toBe('Hola Bob');
  });

  it('clasifica multimedia omitido', () => {
    const media = ds.userMessages.find((m) => m.kind === 'media');
    expect(media).toBeDefined();
    expect(media?.autor).toBe('Bob');
  });

  it('detecta tipo individual', () => {
    expect(ds.metadata.chatType).toBe('individual');
  });

  it('cuenta mensajes por autor', () => {
    expect(ds.metadata.counts.perAuthor['Alice']).toBe(2);
    expect(ds.metadata.counts.perAuthor['Bob']).toBe(2);
  });
});

describe('parseWhatsAppTxt - grupo', () => {
  const ds = parseWhatsAppTxt(sampleGroup);

  it('detecta evento de creación de grupo y nombre', () => {
    const created = ds.mensajes.find((m) => m.systemEvent?.kind === 'group-created');
    expect(created).toBeDefined();
    expect(ds.metadata.chatName).toBe('Grupo Amigos 2026');
  });

  it('detecta tipo grupo', () => {
    expect(ds.metadata.chatType).toBe('group');
  });

  it('parsea encuestas multilínea', () => {
    const poll = ds.userMessages.find((m) => m.kind === 'poll');
    expect(poll).toBeDefined();
    expect(poll?.poll?.question).toBe('Cuál es tu película favorita del año?');
    expect(poll?.poll?.options).toHaveLength(3);
    expect(poll?.poll?.options[1]).toEqual({ label: 'Comedia', votes: 8 });
  });

  it('clasifica mensajes eliminados', () => {
    const deleted = ds.userMessages.find((m) => m.kind === 'deleted');
    expect(deleted).toBeDefined();
  });

  it('detecta evento de añadir miembro', () => {
    const added = ds.mensajes.find((m) => m.systemEvent?.kind === 'member-added');
    expect(added?.systemEvent?.payload?.target).toBe('Diana López');
  });
});

describe('parseWhatsAppTxt - detección de copia-pega', () => {
  const samplePasted = `10/1/26, 16:16 - Ana: Hola
10/1/26, 16:17 - Beto: Mira lo que me dijo: [9/6/2024, 14:41] Carlos: nos vemos el martes
[9/6/2024, 14:42] Carlos: a las siete
[9/6/2024, 14:50] Ana: vale, hasta luego
10/1/26, 16:17 - Beto: Curioso, no?
10/1/26, 16:19 - Ana: ya ves
`;

  const ds = parseWhatsAppTxt(samplePasted);

  it('no crea mensajes para las líneas pegadas con prefijo antiguo', () => {
    expect(ds.userMessages.length).toBe(4);
    const autores = ds.userMessages.map((m) => m.autor);
    expect(autores).toEqual(['Ana', 'Beto', 'Beto', 'Ana']);
  });

  it('fusiona el bloque pegado dentro del mensaje real', () => {
    const beto = ds.userMessages[1];
    expect(beto.autor).toBe('Beto');
    expect(beto.mensaje).toContain('[9/6/2024, 14:41] Carlos: nos vemos el martes');
    expect(beto.mensaje).toContain('[9/6/2024, 14:42] Carlos: a las siete');
    expect(beto.mensaje).toContain('[9/6/2024, 14:50] Ana: vale, hasta luego');
  });

  it('preserva el mensaje real siguiente al bloque pegado', () => {
    expect(ds.userMessages[2].mensaje).toBe('Curioso, no?');
    expect(ds.userMessages[2].timestamp.getFullYear()).toBe(2026);
  });

  it('no fusiona timestamps iguales (mismo minuto)', () => {
    const sameMinute = `10/1/26, 16:13 - Ana: uno
10/1/26, 16:13 - Ana: dos
10/1/26, 16:14 - Ana: tres
`;
    const ds2 = parseWhatsAppTxt(sameMinute);
    expect(ds2.userMessages.length).toBe(3);
    expect(ds2.userMessages.map((m) => m.mensaje)).toEqual(['uno', 'dos', 'tres']);
  });

  it('no se confunde con un único mensaje real al inicio', () => {
    const single = `10/1/26, 16:13 - Ana: solo
`;
    const ds3 = parseWhatsAppTxt(single);
    expect(ds3.userMessages.length).toBe(1);
    expect(ds3.userMessages[0].mensaje).toBe('solo');
  });

  it('funciona con formato corchete (con segundos) y contenido pegado con corchetes', () => {
    const bracketPaste = `[10/1/26, 16:13:38] Ana: Hola a todos
[10/1/26, 16:14:00] Beto: Mira lo que me enviaron: [9/6/2024, 14:41] Carlos: nos vemos el martes
[9/6/2024, 14:42] Carlos: a las siete
[9/6/2024, 14:50] Diana: vale, hasta luego
[10/1/26, 16:14:30] Beto: Curioso, no?
[10/1/26, 16:15:00] Ana: ya ves
`;
    const ds4 = parseWhatsAppTxt(bracketPaste);
    expect(ds4.userMessages.map((m) => m.autor)).toEqual(['Ana', 'Beto', 'Beto', 'Ana']);
    const beto = ds4.userMessages[1];
    expect(beto.mensaje).toContain('[9/6/2024, 14:41] Carlos: nos vemos el martes');
    expect(beto.mensaje).toContain('[9/6/2024, 14:42] Carlos: a las siete');
    expect(beto.mensaje).toContain('[9/6/2024, 14:50] Diana: vale, hasta luego');
    expect(ds4.userMessages[2].mensaje).toBe('Curioso, no?');
    expect(ds4.userMessages[2].timestamp.getFullYear()).toBe(2026);
  });
});

describe('parseWhatsAppTxt - formato iOS (inglés, corchetes con LRM)', () => {
  // iOS exports prefix media/system lines with U+200E (LRM) before the bracket.
  // Media messages also have LRM + "X omitted" at the end of the body.
  const sampleIos = `[6/9/22, 09:12:07] Alice: Hola
‎[6/9/22, 09:14:22] Alice: Mira esto ‎image omitted
‎[6/9/22, 09:15:00] Bob: ‎sticker omitted
[6/9/22, 09:16:00] Bob: Qué tal
‎[6/9/22, 09:17:00] ‎Alice created group "Test Group"
[6/9/22, 09:18:00] Alice: This message was deleted.
`;

  const ds = parseWhatsAppTxt(sampleIos);

  it('parsea mensaje normal', () => {
    expect(ds.userMessages[0].autor).toBe('Alice');
    expect(ds.userMessages[0].mensaje).toBe('Hola');
    expect(ds.userMessages[0].kind).toBe('text');
  });

  it('clasifica media con caption como media', () => {
    const msg = ds.userMessages.find((m) => m.autor === 'Alice' && m.kind === 'media');
    expect(msg).toBeDefined();
    expect(msg?.kind).toBe('media');
  });

  it('clasifica sticker como media', () => {
    const msg = ds.userMessages.find((m) => m.autor === 'Bob' && m.kind === 'media');
    expect(msg).toBeDefined();
  });

  it('no duplica mensajes de líneas con LRM', () => {
    // Each LRM-prefixed line should be its own entry, not folded into the previous
    const aliceMedia = ds.userMessages.filter((m) => m.autor === 'Alice' && m.kind === 'media');
    expect(aliceMedia).toHaveLength(1);
  });

  it('detecta evento de grupo en inglés', () => {
    const created = ds.mensajes.find((m) => m.systemEvent?.kind === 'group-created');
    expect(created).toBeDefined();
    expect(created?.systemEvent?.payload?.groupName).toBe('Test Group');
  });

  it('clasifica mensajes eliminados en inglés', () => {
    const deleted = ds.userMessages.find((m) => m.kind === 'deleted');
    expect(deleted).toBeDefined();
    expect(deleted?.autor).toBe('Alice');
  });
});

describe('parseWhatsAppTxt - encuestas iOS (inglés)', () => {
  const sampleIosPoll = `[16/11/22, 15:58:38] Eva: ‎POLL:
Cuál es tu color favorito?
‎OPTION: Rojo (7 votes)
‎OPTION: Azul (6 votes)
‎OPTION: Verde (6 votes)
[16/11/22, 16:00:12] Carlos: Yo por el azul
`;

  const ds = parseWhatsAppTxt(sampleIosPoll);

  it('clasifica encuesta iOS como poll', () => {
    const poll = ds.userMessages.find((m) => m.kind === 'poll');
    expect(poll).toBeDefined();
    expect(poll?.autor).toBe('Eva');
  });

  it('parsea la pregunta correctamente', () => {
    const poll = ds.userMessages.find((m) => m.kind === 'poll');
    expect(poll?.poll?.question).toBe('Cuál es tu color favorito?');
  });

  it('parsea las opciones con votes (inglés)', () => {
    const poll = ds.userMessages.find((m) => m.kind === 'poll');
    expect(poll?.poll?.options).toHaveLength(3);
    expect(poll?.poll?.options[0]).toEqual({ label: 'Rojo', votes: 7 });
    expect(poll?.poll?.options[1]).toEqual({ label: 'Azul', votes: 6 });
  });

  it('no confunde la encuesta con el mensaje siguiente', () => {
    expect(ds.userMessages).toHaveLength(2);
    expect(ds.userMessages[1].mensaje).toBe('Yo por el azul');
  });
});

describe('parseWhatsAppTxt - evento sistema embebido iOS', () => {
  // iOS exports member-added events as "[DATE] AddedPerson: ‎Actor added AddedPerson"
  const sampleIosEvent = `[16/11/22, 15:14:16] Bob: ‎Alice added Bob
[16/11/22, 15:15:00] Bob: hola
`;

  const ds = parseWhatsAppTxt(sampleIosEvent);

  it('detecta evento member-added embebido', () => {
    const added = ds.mensajes.find((m) => m.systemEvent?.kind === 'member-added');
    expect(added).toBeDefined();
    expect(added?.systemEvent?.payload?.actor).toBe('Alice');
    expect(added?.systemEvent?.payload?.target).toBe('Bob');
  });

  it('no cuenta el evento como mensaje de usuario', () => {
    expect(ds.userMessages).toHaveLength(1);
    expect(ds.userMessages[0].mensaje).toBe('hola');
  });
});

describe('parseWhatsAppTxt - mensajes eliminados y editados', () => {
  const sample = `2/8/22, 11:43 - Alice: Hola
2/8/22, 11:44 - Alice: Eliminaste este mensaje.
2/8/22, 11:44 - Bob: Se eliminó este mensaje.
2/8/22, 11:45 - Alice: Texto real <Se editó este mensaje.>
[2/8/22, 11:46:00] Alice: Hola iOS
[2/8/22, 11:47:08] Bob: ‎This message was deleted.
[2/8/22, 11:48:40] Alice: Texto real ‎<This message was edited>
`;

  const ds = parseWhatsAppTxt(sample);

  it('clasifica "Eliminaste este mensaje." como deleted (Android)', () => {
    const msg = ds.userMessages.find((m) => m.autor === 'Alice' && m.kind === 'deleted');
    expect(msg).toBeDefined();
  });

  it('clasifica "Se eliminó este mensaje." como deleted (Android)', () => {
    const msg = ds.userMessages.find((m) => m.autor === 'Bob' && m.kind === 'deleted');
    expect(msg).toBeDefined();
  });

  it('clasifica "‎This message was deleted." como deleted (iOS)', () => {
    const deleted = ds.userMessages.filter((m) => m.kind === 'deleted');
    expect(deleted).toHaveLength(3); // 2 Android + 1 iOS
    expect(deleted.some((m) => m.autor === 'Bob' && m.timestamp.getMinutes() === 47)).toBe(true);
  });

  it('elimina sufijo editado Android y marca isEdited', () => {
    const androidEdited = ds.userMessages.find(
      (m) => m.isEdited && m.mensaje === 'Texto real',
    );
    expect(androidEdited).toBeDefined();
    expect(androidEdited?.mensaje).toBe('Texto real');
    expect(androidEdited?.mensaje).not.toContain('editó');
  });

  it('elimina sufijo editado iOS y marca isEdited', () => {
    const iosEdited = ds.userMessages.filter((m) => m.isEdited);
    expect(iosEdited).toHaveLength(2);
    expect(iosEdited.every((m) => m.mensaje === 'Texto real')).toBe(true);
  });
});

describe('parseWhatsAppTxt - Android inglés (dash + tokens EN)', () => {
  const sample = `2/8/22, 11:43 - Alice: Hola
2/8/22, 11:44 - Alice: <Media omitted>
2/8/22, 11:45 - Bob: ok
`;
  const ds = parseWhatsAppTxt(sample);

  it('clasifica <Media omitted> como media', () => {
    const media = ds.userMessages.find((m) => m.kind === 'media');
    expect(media).toBeDefined();
    expect(media?.autor).toBe('Alice');
  });
});

describe('parseWhatsAppTxt - iOS español (bracket + tokens ES)', () => {
  const sample = `[2/8/22, 11:43:00] Alice: Hola
‎[2/8/22, 11:44:00] Alice: ‎imagen omitida
‎[2/8/22, 11:44:30] Bob: ‎vídeo omitido
‎[2/8/22, 11:45:00] Alice: ‎sticker omitido
[2/8/22, 11:46:00] Bob: ok
`;
  const ds = parseWhatsAppTxt(sample);

  it('clasifica imagen omitida como media', () => {
    const media = ds.userMessages.filter((m) => m.kind === 'media');
    expect(media).toHaveLength(3);
  });

  it('no mezcla los mensajes de media con texto normal', () => {
    expect(ds.userMessages.at(-1)?.mensaje).toBe('ok');
    expect(ds.userMessages.at(-1)?.kind).toBe('text');
  });
});

describe('parseWhatsAppTxt - errores', () => {
  it('lanza ParseError si el archivo está vacío', () => {
    expect(() => parseWhatsAppTxt('')).toThrow();
  });

  it('lanza ParseError si no hay líneas con formato válido', () => {
    expect(() => parseWhatsAppTxt('hola\nesto no es un chat')).toThrow();
  });
});
