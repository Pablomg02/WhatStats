import ReactECharts from 'echarts-for-react';
import type { ScatterQuadrantData } from '@/core/types/stat-result';

const darkAxisBase = {
  axisLine: { lineStyle: { color: '#2E3D43' } },
  splitLine: { lineStyle: { color: '#2E3D43', type: 'dashed' as const } },
  nameTextStyle: { color: '#8696A0' },
};

const PALETTE = [
  '#00A884',
  '#25D366',
  '#53BDEB',
  '#F5B638',
  '#F15C6D',
  '#A06CD5',
  '#F09433',
  '#7ED957',
];

export function ScatterQuadrant({ data }: { data: ScatterQuadrantData }) {
  const xMin = data.xMin ?? 0;
  const xMax = data.xMax ?? 100;
  const yMin = data.yMin ?? 0;
  const yMax = data.yMax ?? 100;
  const xT = data.xThreshold ?? (xMin + xMax) / 2;
  const yT = data.yThreshold ?? (yMin + yMax) / 2;

  const series = data.points.map((p, i) => ({
    name: p.label,
    type: 'scatter' as const,
    symbolSize: 22,
    itemStyle: {
      color: PALETTE[i % PALETTE.length],
      borderColor: '#0B141A',
      borderWidth: 2,
      shadowColor: 'rgba(0,0,0,0.4)',
      shadowBlur: 6,
    },
    data: [[p.x, p.y, p.label, p.extra ?? '']],
    label: {
      show: true,
      position: 'right' as const,
      formatter: p.label,
      color: '#E9EDEF',
      fontWeight: 500,
      fontSize: 12,
      backgroundColor: 'rgba(31,44,51,0.85)',
      padding: [3, 6],
      borderRadius: 4,
    },
    emphasis: {
      scale: 1.2,
      itemStyle: { borderColor: '#E9EDEF', borderWidth: 2 },
    },
    markLine:
      i === 0
        ? {
            silent: true,
            symbol: 'none',
            lineStyle: { color: '#2E3D43', type: 'dashed' as const, width: 1 },
            label: { show: false },
            data: [
              { xAxis: xT },
              { yAxis: yT },
            ],
          }
        : undefined,
    markArea:
      i === 0 && data.quadrantLabels
        ? {
            silent: true,
            itemStyle: { color: 'transparent' },
            label: {
              show: true,
              color: '#8696A0',
              fontSize: 10,
              fontStyle: 'italic' as const,
              opacity: 0.7,
            },
            data: [
              [
                { name: data.quadrantLabels.topLeft ?? '', coord: [xMin, yMax], label: { position: 'insideTopLeft' as const } },
                { coord: [xT, yT] },
              ],
              [
                { name: data.quadrantLabels.topRight ?? '', coord: [xT, yMax], label: { position: 'insideTopRight' as const } },
                { coord: [xMax, yT] },
              ],
              [
                { name: data.quadrantLabels.bottomLeft ?? '', coord: [xMin, yT], label: { position: 'insideBottomLeft' as const } },
                { coord: [xT, yMin] },
              ],
              [
                { name: data.quadrantLabels.bottomRight ?? '', coord: [xT, yT], label: { position: 'insideBottomRight' as const } },
                { coord: [xMax, yMin] },
              ],
            ],
          }
        : undefined,
  }));

  const option = {
    backgroundColor: 'transparent',
    textStyle: { color: '#8696A0', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" },
    tooltip: {
      trigger: 'item' as const,
      backgroundColor: '#1F2C33',
      borderColor: '#2E3D43',
      textStyle: { color: '#E9EDEF' },
      formatter: (params: { data: [number, number, string, string] }) => {
        const [x, y, label, extra] = params.data;
        const xFmt = Math.round(x * 10) / 10;
        const yFmt = Math.round(y * 10) / 10;
        return `<div style="font-weight:600">${escapeHtml(label)}</div>
                <div>${escapeHtml(data.xLabel)}: ${xFmt}%</div>
                <div>${escapeHtml(data.yLabel)}: ${yFmt}%</div>
                ${extra ? `<div style="color:#8696A0;margin-top:4px">${escapeHtml(extra)}</div>` : ''}`;
      },
    },
    legend: { show: false },
    grid: { left: 60, right: 90, top: 30, bottom: 60, containLabel: true },
    xAxis: {
      type: 'value' as const,
      min: xMin,
      max: xMax,
      name: data.xLabel,
      nameLocation: 'middle' as const,
      nameGap: 32,
      ...darkAxisBase,
      axisLabel: { color: '#8696A0', formatter: '{value}%' },
    },
    yAxis: {
      type: 'value' as const,
      min: yMin,
      max: yMax,
      name: data.yLabel,
      nameLocation: 'middle' as const,
      nameGap: 50,
      ...darkAxisBase,
      axisLabel: { color: '#8696A0', formatter: '{value}%' },
    },
    series,
  };

  return <ReactECharts option={option} style={{ height: 'clamp(300px, 68vw, 440px)' }} />;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
