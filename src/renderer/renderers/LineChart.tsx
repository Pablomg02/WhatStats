import ReactECharts from 'echarts-for-react';
import type { LineChartData } from '@/core/types/stat-result';

export function LineChart({ data }: { data: LineChartData }) {
  const option = {
    grid: { left: 60, right: 30, top: 30, bottom: 50 },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: data.points.map((p) => p.x), name: data.xLabel },
    yAxis: { type: 'value', name: data.yLabel },
    series: [
      {
        type: 'line',
        data: data.points.map((p) => p.y),
        smooth: data.smooth ?? true,
        areaStyle: data.area ? { opacity: 0.25 } : undefined,
        itemStyle: { color: '#128C7E' },
        lineStyle: { color: '#128C7E', width: 2 },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 380 }} />;
}
