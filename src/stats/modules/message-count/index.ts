import type { StatModule } from '../../types';
import { computeMessageCount } from './compute';

const messageCount: StatModule = {
  id: 'message-count',
  label: 'Volumen agregado',
  description: 'Totales de mensajes, palabras y contenido enriquecido.',
  needsParams: false,
  compute: (dataset) => ({ kind: 'kpi-grid', data: computeMessageCount(dataset) }),
};

export default messageCount;
