import type { StatModule } from '../../types';
import { computeTopDays, type TopDaysParams } from './compute';

const topDays: StatModule<TopDaysParams> = {
  id: 'top-days',
  label: 'Top días',
  description: 'Días del calendario con más mensajes.',
  needsParams: true,
  paramsSchema: {
    fields: [{ name: 'n', type: 'number', label: '¿Cuántos?', placeholder: '10' }],
  },
  compute: (dataset, params) => ({ kind: 'bar-chart', data: computeTopDays(dataset, params ?? {}) }),
};

export default topDays;
