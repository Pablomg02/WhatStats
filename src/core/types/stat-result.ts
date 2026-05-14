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

export type StatResult =
  | { kind: 'bar-chart'; data: BarChartData }
  | { kind: 'line-chart'; data: LineChartData }
  | { kind: 'ranking'; data: RankingData }
  | { kind: 'kpi-grid'; data: KpiGridData }
  | { kind: 'heatmap'; data: HeatmapData }
  | { kind: 'text-samples'; data: TextSampleData };

export type StatResultKind = StatResult['kind'];
