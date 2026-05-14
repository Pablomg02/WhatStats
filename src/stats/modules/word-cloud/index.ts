import type { StatModule } from '../../types';
import { computeWordCloud, type WordCloudParams } from './compute';

const wordCloud: StatModule<WordCloudParams> = {
  id: 'word-cloud',
  label: 'Nube de palabras',
  description: 'Palabras más usadas por cada participante, sin stop-words.',
  needsParams: true,
  paramsSchema: {
    fields: [
      {
        name: 'top',
        type: 'number',
        label: 'Top palabras por usuario',
        placeholder: '40',
        min: '5',
      },
    ],
  },
  compute: (dataset, params) => ({
    kind: 'word-cloud',
    data: computeWordCloud(dataset, params ?? {}),
  }),
};

export default wordCloud;
