import type { StatModule } from '../../types';
import { computeTopWeeks, type TopWeeksParams } from './compute';

const topWeeks: StatModule<TopWeeksParams> = {
  id: 'top-weeks',
  label: 'Top semanas',
  description: 'Semanas con más mensajes (agrupadas por lunes).',
  needsParams: true,
  paramsSchema: {
    fields: [{ name: 'n', type: 'number', label: '¿Cuántas?', placeholder: '10' }],
  },
  compute: (dataset, params) => ({ kind: 'bar-chart', data: computeTopWeeks(dataset, params ?? {}) }),
};

export default topWeeks;
