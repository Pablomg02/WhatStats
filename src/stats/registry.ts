import type { AnyStatModule } from './types';
import messageCount from './modules/message-count';
import rankingParticipants from './modules/ranking-participants';
import monthlyActivity from './modules/monthly-activity';
import weekdayActivity from './modules/weekday-activity';
import hourOfDay from './modules/hour-of-day';
import hourWeekdayHeatmap from './modules/hour-weekday-heatmap';
import topDays from './modules/top-days';
import topWeeks from './modules/top-weeks';
import longestStreak from './modules/longest-streak';
import longestSilences from './modules/longest-silences';
import wordSearch from './modules/word-search';
import wordCloud from './modules/word-cloud';
import reachOutRatio from './modules/reach-out-ratio';
import doubleTexting from './modules/double-texting';
import conversationStarterEnder from './modules/conversation-starter-ender';
import randomSnippet from './modules/random-snippet';

export const statRegistry: AnyStatModule[] = [
  messageCount,
  rankingParticipants,
  monthlyActivity,
  weekdayActivity,
  hourOfDay,
  hourWeekdayHeatmap,
  topDays,
  topWeeks,
  longestStreak,
  longestSilences,
  reachOutRatio,
  doubleTexting,
  conversationStarterEnder,
  wordCloud,
  wordSearch,
  randomSnippet,
];

const byId = new Map(statRegistry.map((s) => [s.id, s]));

export function getStatModule(id: string): AnyStatModule | undefined {
  return byId.get(id);
}
