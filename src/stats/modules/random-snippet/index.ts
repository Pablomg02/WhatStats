import type { StatModule } from '../../types';
import { computeRandomSnippet, type RandomSnippetParams } from './compute';

const randomSnippet: StatModule<RandomSnippetParams> = {
  id: 'random-snippet',
  label: 'Fragmento aleatorio',
  description: 'Muestra N mensajes consecutivos aleatorios del chat, como si estuvieras leyendo la conversación.',
  needsParams: true,
  rerollable: true,
  paramsSchema: {
    fields: [
      {
        name: 'count',
        type: 'number',
        label: 'Número de mensajes',
        placeholder: 'Ej: 10',
        required: true,
        min: '2',
        max: '50',
      },
    ],
  },
  compute: (dataset, params) => ({
    kind: 'chat-snippet',
    data: computeRandomSnippet(dataset, params),
  }),
};

export default randomSnippet;
