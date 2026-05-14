import { describe, expect, it } from 'vitest';
import { parseWhatsAppTxt } from './index';

const sampleIndividual = `24/5/21, 15:18 - Los mensajes y las llamadas están cifrados de extremo a extremo. Solo las personas en este chat pueden leerlos, escucharlos o compartirlos. *Más información*
24/5/21, 15:18 - Ivan Aero: Hola pablo
24/5/21, 15:18 - Ivan Aero: Tenia una duda con lo de los cambios en los examenes
24/5/21, 15:55 - Pablo M: Holis
16/11/21, 14:53 - Pablo M: <Multimedia omitido>
`;

const sampleGroup = `4/4/26, 20:31 - ‎Marcos Quiroga creó el grupo "🍊 Casa Rural 2026".
4/4/26, 20:34 - ‎Marcos Quiroga añadió a Iago Pazos.
4/4/26, 20:35 - Marcos Quiroga: Ya estamos todos
4/4/26, 20:35 - Gabri: Hola Quiroga!
5/4/26, 10:31 - Gabri: ENCUESTA:
Te hiciste pajilla en la casa rural 2025?
OPCIÓN: Si (‎1 voto)
OPCIÓN: No (‎8 votos)
OPCIÓN: Remu (‎2 votos)

5/4/26, 15:19 - Marcos Quiroga: Se eliminó este mensaje.
`;

describe('parseWhatsAppTxt - individual', () => {
  const ds = parseWhatsAppTxt(sampleIndividual);

  it('detecta el aviso E2E como sistema', () => {
    expect(ds.mensajes[0].isSystem).toBe(true);
    expect(ds.mensajes[0].systemEvent?.kind).toBe('e2e-notice');
  });

  it('parsea mensajes de usuario', () => {
    expect(ds.userMessages.length).toBe(4);
    expect(ds.userMessages[0].autor).toBe('Ivan Aero');
    expect(ds.userMessages[0].mensaje).toBe('Hola pablo');
  });

  it('clasifica multimedia omitido', () => {
    const media = ds.userMessages.find((m) => m.kind === 'media');
    expect(media).toBeDefined();
    expect(media?.autor).toBe('Pablo M');
  });

  it('detecta tipo individual', () => {
    expect(ds.metadata.chatType).toBe('individual');
  });

  it('cuenta mensajes por autor', () => {
    expect(ds.metadata.counts.perAuthor['Ivan Aero']).toBe(2);
    expect(ds.metadata.counts.perAuthor['Pablo M']).toBe(2);
  });
});

describe('parseWhatsAppTxt - grupo', () => {
  const ds = parseWhatsAppTxt(sampleGroup);

  it('detecta evento de creación de grupo y nombre', () => {
    const created = ds.mensajes.find((m) => m.systemEvent?.kind === 'group-created');
    expect(created).toBeDefined();
    expect(ds.metadata.chatName).toBe('🍊 Casa Rural 2026');
  });

  it('detecta tipo grupo', () => {
    expect(ds.metadata.chatType).toBe('group');
  });

  it('parsea encuestas multilínea', () => {
    const poll = ds.userMessages.find((m) => m.kind === 'poll');
    expect(poll).toBeDefined();
    expect(poll?.poll?.question).toBe('Te hiciste pajilla en la casa rural 2025?');
    expect(poll?.poll?.options).toHaveLength(3);
    expect(poll?.poll?.options[1]).toEqual({ label: 'No', votes: 8 });
  });

  it('clasifica mensajes eliminados', () => {
    const deleted = ds.userMessages.find((m) => m.kind === 'deleted');
    expect(deleted).toBeDefined();
  });

  it('detecta evento de añadir miembro', () => {
    const added = ds.mensajes.find((m) => m.systemEvent?.kind === 'member-added');
    expect(added?.systemEvent?.payload?.target).toBe('Iago Pazos');
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
