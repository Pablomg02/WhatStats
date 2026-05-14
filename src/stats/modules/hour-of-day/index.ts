import type { StatModule } from '../../types';
import { computeHourOfDay } from './compute';

const hourOfDay: StatModule = {
  id: 'hour-of-day',
  label: 'Actividad por hora',
  description: 'Distribución de mensajes a lo largo del día.',
  needsParams: false,
  compute: (dataset) => ({ kind: 'bar-chart', data: computeHourOfDay(dataset) }),
};

export default hourOfDay;
