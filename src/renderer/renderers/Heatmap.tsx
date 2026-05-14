import ReactECharts from 'echarts-for-react';
import type { HeatmapData } from '@/core/types/stat-result';

export function Heatmap({ data }: { data: HeatmapData }) {
  const max = Math.max(...data.cells.map((c) => c.value), 1);

  const option = {
    tooltip: { position: 'top' },
    grid: { left: 80, right: 30, top: 30, bottom: 50 },
    xAxis: { type: 'category', data: data.xLabels, splitArea: { show: true } },
    yAxis: { type: 'category', data: data.yLabels, splitArea: { show: true } },
    visualMap: {
      min: 0,
      max,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: 0,
      inRange: { color: ['#ECE5DD', '#128C7E', '#075E54'] },
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
