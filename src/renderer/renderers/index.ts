import type { ComponentType } from 'react';
import type { StatResult, StatResultKind } from '@/core/types/stat-result';
import { BarChart } from './BarChart';
import { LineChart } from './LineChart';
import { TableRanking } from './TableRanking';
import { KpiGrid } from './KpiGrid';
import { Heatmap } from './Heatmap';
import { TextSamples } from './TextSamples';
import { ScatterQuadrant } from './ScatterQuadrant';
import { WordCloud } from './WordCloud';

type RendererMap = {
  [K in StatResultKind]: ComponentType<{ data: Extract<StatResult, { kind: K }>['data'] }>;
};

export const renderers: RendererMap = {
  'bar-chart': BarChart,
  'line-chart': LineChart,
  ranking: TableRanking,
  'kpi-grid': KpiGrid,
  heatmap: Heatmap,
  'text-samples': TextSamples,
  'scatter-quadrant': ScatterQuadrant,
  'word-cloud': WordCloud,
};
