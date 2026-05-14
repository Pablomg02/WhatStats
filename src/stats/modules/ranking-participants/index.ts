import type { StatModule } from '../../types';
import { computeRankingParticipants } from './compute';

const rankingParticipants: StatModule = {
  id: 'ranking-participants',
  label: 'Ranking por participante',
  description: 'Mensajes por emisor en orden descendente.',
  needsParams: false,
  compute: (dataset) => ({ kind: 'ranking', data: computeRankingParticipants(dataset) }),
};

export default rankingParticipants;
