import { describe, expect, it } from 'vitest';
import { parseWhatsAppTxt } from '@/parser/index';
import { computeReachOutRatio } from './modules/reach-out-ratio/compute';
import { computeDoubleTexting } from './modules/double-texting/compute';
import { computeConversationStarterEnder } from './modules/conversation-starter-ender/compute';
import { computeHourWeekdayHeatmap } from './modules/hour-weekday-heatmap/compute';
import { computeWordCloud } from './modules/word-cloud/compute';
import { SYNTHETIC_INDIVIDUAL_CHAT } from './test-data';

const dataset = parseWhatsAppTxt(SYNTHETIC_INDIVIDUAL_CHAT);

describe('reach-out-ratio', () => {
  it('returns one row per participant and percentages sum to 100', () => {
    const r = computeReachOutRatio(dataset, { hours: 48 });
    expect(r.rows.length).toBe(dataset.participantes.length);
    const totalEvents = r.rows.reduce((a, b) => a + b.value, 0);
    expect(totalEvents).toBeGreaterThan(0);
    const pcts = r.rows.map((row) => parseFloat((row.extra ?? '0%').replace('%', '')));
    const sum = pcts.reduce((a, b) => a + b, 0);
    expect(sum).toBeGreaterThan(99);
    expect(sum).toBeLessThan(101);
  });

  it('falls back to default when threshold is non-positive', () => {
    const r = computeReachOutRatio(dataset, { hours: 0 });
    expect(r.rows.length).toBeGreaterThan(0);
  });
});

describe('double-texting', () => {
  it('returns rows for every participant', () => {
    const r = computeDoubleTexting(dataset, { minutes: 15 });
    expect(r.rows.length).toBe(dataset.participantes.length);
    expect(r.rows.every((row) => row.value >= 0)).toBe(true);
  });

  it('rate is per 100 messages and bounded', () => {
    const r = computeDoubleTexting(dataset, { minutes: 15 });
    for (const row of r.rows) {
      expect(row.value).toBeGreaterThanOrEqual(0);
      expect(row.value).toBeLessThanOrEqual(100);
    }
  });
});

describe('conversation-starter-ender', () => {
  it('returns x,y in [0,100] for each participant and labels quadrants', () => {
    const r = computeConversationStarterEnder(dataset, { hours: 48 });
    expect(r.points.length).toBe(dataset.participantes.length);
    expect(r.quadrantLabels?.bottomRight).toBe('Ansioso');
    for (const p of r.points) {
      expect(p.x).toBeGreaterThanOrEqual(0);
      expect(p.x).toBeLessThanOrEqual(100);
      expect(p.y).toBeGreaterThanOrEqual(0);
      expect(p.y).toBeLessThanOrEqual(100);
    }
    const sumX = r.points.reduce((a, b) => a + b.x, 0);
    const sumY = r.points.reduce((a, b) => a + b.y, 0);
    expect(sumX).toBeGreaterThan(99);
    expect(sumX).toBeLessThan(101);
    expect(sumY).toBeGreaterThan(99);
    expect(sumY).toBeLessThan(101);
  });
});

describe('hour-weekday-heatmap', () => {
  it('returns 7×24 cells', () => {
    const r = computeHourWeekdayHeatmap(dataset);
    expect(r.yLabels.length).toBe(7);
    expect(r.xLabels.length).toBe(24);
    expect(r.cells.length).toBe(7 * 24);
    const total = r.cells.reduce((a, c) => a + c.value, 0);
    expect(total).toBe(dataset.userMessages.length);
  });
});

describe('word-cloud', () => {
  it('produces a group per participant with sensible top words', () => {
    const r = computeWordCloud(dataset, { top: 30 });
    expect(r.groups.length).toBeGreaterThan(0);
    for (const g of r.groups) {
      expect(g.words.length).toBeGreaterThan(0);
      expect(g.words.length).toBeLessThanOrEqual(30);
      for (let i = 1; i < g.words.length; i++) {
        expect(g.words[i].weight).toBeLessThanOrEqual(g.words[i - 1].weight);
      }
      for (const w of g.words) {
        expect(w.text.length).toBeGreaterThanOrEqual(3);
        expect(/^\d+$/.test(w.text)).toBe(false);
      }
    }
  });

  it('filters Spanish stop words', () => {
    const r = computeWordCloud(dataset, { top: 100 });
    for (const g of r.groups) {
      const words = g.words.map((w) => w.text);
      expect(words).not.toContain('que');
      expect(words).not.toContain('para');
      expect(words).not.toContain('con');
    }
  });
});
