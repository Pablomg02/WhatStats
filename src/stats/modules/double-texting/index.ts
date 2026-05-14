import type { StatModule } from '../../types';
import { computeDoubleTexting, type DoubleTextingParams } from './compute';

const doubleTexting: StatModule<DoubleTextingParams> = {
  id: 'double-texting',
  label: 'Double texting',
  description: 'Cuántas veces cada participante insiste sin recibir respuesta.',
  needsParams: true,
  paramsSchema: {
    fields: [
      {
        name: 'minutes',
        type: 'number',
        label: 'Minutos sin respuesta',
        placeholder: '15',
        min: '1',
      },
    ],
  },
  compute: (dataset, params) => ({
    kind: 'ranking',
    data: computeDoubleTexting(dataset, params ?? {}),
  }),
};

export default doubleTexting;
