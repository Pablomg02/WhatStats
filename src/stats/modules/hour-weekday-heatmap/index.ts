import type { StatModule } from '../../types';
import { computeHourWeekdayHeatmap } from './compute';

const hourWeekdayHeatmap: StatModule = {
  id: 'hour-weekday-heatmap',
  label: 'Mapa día × hora',
  description: 'Actividad cruzada por día de la semana y hora del día.',
  needsParams: false,
  compute: (dataset) => ({
    kind: 'heatmap',
    data: computeHourWeekdayHeatmap(dataset),
  }),
};

export default hourWeekdayHeatmap;
