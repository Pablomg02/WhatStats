import type { StatModule } from '../../types';
import { computeLongestSilences, type LongestSilencesParams } from './compute';

const longestSilences: StatModule<LongestSilencesParams> = {
  id: 'longest-silences',
  label: 'Mayor tiempo sin hablar',
  description: 'Periodos más largos sin mensajes en el chat.',
  needsParams: true,
  paramsSchema: {
    fields: [{ name: 'n', type: 'number', label: '¿Cuántos?', placeholder: '10' }],
  },
  compute: (dataset, params) => ({
    kind: 'ranking',
    data: computeLongestSilences(dataset, params ?? {}),
  }),
};

export default longestSilences;
