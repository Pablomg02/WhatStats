import type { AnyStatModule } from './types';
import messageCount from './modules/message-count';
import rankingParticipants from './modules/ranking-participants';
import monthlyActivity from './modules/monthly-activity';
import weekdayActivity from './modules/weekday-activity';
import hourOfDay from './modules/hour-of-day';
import topDays from './modules/top-days';
import topWeeks from './modules/top-weeks';
import longestStreak from './modules/longest-streak';
import longestSilences from './modules/longest-silences';
import wordSearch from './modules/word-search';

export const statRegistry: AnyStatModule[] = [
  messageCount,
  rankingParticipants,
  monthlyActivity,
  weekdayActivity,
  hourOfDay,
  topDays,
  topWeeks,
  longestStreak,
  longestSilences,
  wordSearch,
];

const byId = new Map(statRegistry.map((s) => [s.id, s]));

export function getStatModule(id: string): AnyStatModule | undefined {
  return byId.get(id);
}
