import type { StatModule } from '../../types';
import { computeReachOutRatio, type ReachOutRatioParams } from './compute';

const reachOutRatio: StatModule<ReachOutRatioParams> = {
  id: 'reach-out-ratio',
  label: 'Quién rompe el silencio',
  description: 'Tras cada silencio largo, quién manda el primer mensaje.',
  needsParams: true,
  paramsSchema: {
    fields: [
      {
        name: 'hours',
        type: 'number',
        label: 'Umbral de silencio (horas)',
        placeholder: '48',
        min: '1',
      },
    ],
  },
  compute: (dataset, params) => ({
    kind: 'ranking',
    data: computeReachOutRatio(dataset, params ?? {}),
  }),
};

export default reachOutRatio;
