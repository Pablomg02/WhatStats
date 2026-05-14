import type { StatModule } from '../../types';
import { computeLongestStreak } from './compute';

const longestStreak: StatModule = {
  id: 'longest-streak',
  label: 'Racha más larga',
  description: 'Días consecutivos con actividad en el chat.',
  needsParams: false,
  compute: (dataset) => ({ kind: 'kpi-grid', data: computeLongestStreak(dataset) }),
};

export default longestStreak;
