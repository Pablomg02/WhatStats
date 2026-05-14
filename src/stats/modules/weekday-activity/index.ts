import type { StatModule } from '../../types';
import { computeWeekdayActivity } from './compute';

const weekdayActivity: StatModule = {
  id: 'weekday-activity',
  label: 'Actividad por día',
  description: 'Mensajes agrupados por día de la semana (L–D).',
  needsParams: false,
  compute: (dataset) => ({ kind: 'bar-chart', data: computeWeekdayActivity(dataset) }),
};

export default weekdayActivity;
