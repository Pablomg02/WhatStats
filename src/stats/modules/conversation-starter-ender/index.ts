import type { StatModule } from '../../types';
import {
  computeConversationStarterEnder,
  type ConversationStarterEnderParams,
} from './compute';

const conversationStarterEnder: StatModule<ConversationStarterEnderParams> = {
  id: 'conversation-starter-ender',
  label: 'Perfil abridor/cerrador',
  description:
    'Quién abre y quién cierra las conversaciones. Cuadrantes: ansioso, distante, dominante, ausente.',
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
    kind: 'scatter-quadrant',
    data: computeConversationStarterEnder(dataset, params ?? {}),
  }),
};

export default conversationStarterEnder;
