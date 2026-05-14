export interface BarChartData {
  labels: string[];
  values: number[];
  xLabel?: string;
  yLabel?: string;
  horizontal?: boolean;
}

export interface LineChartPoint {
  x: string | number;
  y: number;
}

export interface LineChartData {
  points: LineChartPoint[];
  smooth?: boolean;
  area?: boolean;
  xLabel?: string;
  yLabel?: string;
}

export interface RankingRow {
  label: string;
  value: number;
  extra?: string;
}

export interface RankingData {
  rows: RankingRow[];
  valueLabel?: string;
}

export interface KpiItem {
  label: string;
  value: string | number;
  hint?: string;
}

export interface KpiGridData {
  items: KpiItem[];
}

export interface HeatmapCell {
  x: string | number;
  y: string | number;
  value: number;
}

export interface HeatmapData {
  cells: HeatmapCell[];
  xLabels: string[];
  yLabels: string[];
}

export interface TextSampleData {
  title?: string;
  samples: { label: string; text: string }[];
}

export interface ScatterPoint {
  label: string;
  x: number;
  y: number;
  extra?: string;
}

export interface ScatterQuadrantData {
  points: ScatterPoint[];
  xLabel: string;
  yLabel: string;
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
  xThreshold?: number;
  yThreshold?: number;
  quadrantLabels?: {
    topLeft?: string;
    topRight?: string;
    bottomLeft?: string;
    bottomRight?: string;
  };
}

export interface WordCloudWord {
  text: string;
  weight: number;
}

export interface WordCloudGroup {
  label: string;
  words: WordCloudWord[];
}

export interface WordCloudData {
  groups: WordCloudGroup[];
}

export interface ChatSnippetMessage {
  author: string;
  time: string;
  date?: string;
  text: string;
  isFirstFromAuthor: boolean;
  isMedia: boolean;
  isDeleted: boolean;
}

export interface ChatSnippetData {
  messages: ChatSnippetMessage[];
}

export type StatResult =
  | { kind: 'bar-chart'; data: BarChartData }
  | { kind: 'line-chart'; data: LineChartData }
  | { kind: 'ranking'; data: RankingData }
  | { kind: 'kpi-grid'; data: KpiGridData }
  | { kind: 'heatmap'; data: HeatmapData }
  | { kind: 'text-samples'; data: TextSampleData }
  | { kind: 'scatter-quadrant'; data: ScatterQuadrantData }
  | { kind: 'word-cloud'; data: WordCloudData }
  | { kind: 'chat-snippet'; data: ChatSnippetData };

export type StatResultKind = StatResult['kind'];
