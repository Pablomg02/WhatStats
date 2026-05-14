import type { StatModule } from '../../types';
import { computeMonthlyActivity } from './compute';

const monthlyActivity: StatModule = {
  id: 'monthly-activity',
  label: 'Actividad mensual',
  description: 'Serie temporal del volumen de mensajes mes a mes.',
  needsParams: false,
  compute: (dataset) => ({ kind: 'line-chart', data: computeMonthlyActivity(dataset) }),
};

export default monthlyActivity;
