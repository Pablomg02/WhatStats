import type { StatModule } from '../../types';
import { computeWordSearch, type WordSearchParams } from './compute';

const wordSearch: StatModule<WordSearchParams> = {
  id: 'word-search',
  label: 'Búsqueda de palabra',
  description: 'Ranking de personas que más usan una palabra concreta.',
  needsParams: true,
  paramsSchema: {
    fields: [
      { name: 'word', type: 'text', label: 'Palabra', placeholder: 'Ej: hola', required: true },
    ],
  },
  compute: (dataset, params) => ({ kind: 'ranking', data: computeWordSearch(dataset, params) }),
};

export default wordSearch;
