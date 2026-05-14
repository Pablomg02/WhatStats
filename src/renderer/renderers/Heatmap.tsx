import ReactECharts from 'echarts-for-react';
import type { HeatmapData } from '@/core/types/stat-result';

const darkAxis = {
  axisLine: { lineStyle: { color: '#2E3D43' } },
  axisLabel: { color: '#8696A0' },
  splitLine: { lineStyle: { color: '#2E3D43' } },
  splitArea: { show: true, areaStyle: { color: ['#1F2C33', '#233137'] } },
};

export function Heatmap({ data }: { data: HeatmapData }) {
  const max = Math.max(...data.cells.map((c) => c.value), 1);

  const option = {
    backgroundColor: 'transparent',
    textStyle: { color: '#8696A0', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" },
    tooltip: {
      position: 'top',
      backgroundColor: '#1F2C33',
      borderColor: '#2E3D43',
      textStyle: { color: '#E9EDEF' },
    },
    grid: { left: 80, right: 30, top: 30, bottom: 60 },
    xAxis: { type: 'category', data: data.xLabels, ...darkAxis },
    yAxis: { type: 'category', data: data.yLabels, ...darkAxis },
    visualMap: {
      min: 0,
      max,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 0,
      textStyle: { color: '#8696A0' },
      inRange: { color: ['#1F2C33', '#00A884', '#075E54'] },
    },
    series: [
      {
        type: 'heatmap',
        data: data.cells.map((c) => [c.x, c.y, c.value]),
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 380 }} />;
}
