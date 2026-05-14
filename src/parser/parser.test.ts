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

describe('parseWhatsAppTxt - errores', () => {
  it('lanza ParseError si el archivo está vacío', () => {
    expect(() => parseWhatsAppTxt('')).toThrow();
  });

  it('lanza ParseError si no hay líneas con formato válido', () => {
    expect(() => parseWhatsAppTxt('hola\nesto no es un chat')).toThrow();
  });
});
