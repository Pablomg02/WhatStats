import ReactECharts from 'echarts-for-react';
import type { BarChartData } from '@/core/types/stat-result';

export function BarChart({ data }: { data: BarChartData }) {
  const horizontal = data.horizontal ?? false;

  const option = {
    grid: { left: horizontal ? 120 : 50, right: 30, top: 30, bottom: 50 },
    tooltip: { trigger: 'axis' },
    xAxis: horizontal
      ? { type: 'value', name: data.yLabel }
      : { type: 'category', data: data.labels, name: data.xLabel },
    yAxis: horizontal
      ? { type: 'category', data: data.labels, name: data.xLabel }
      : { type: 'value', name: data.yLabel },
    series: [
      {
        type: 'bar',
        data: data.values,
        itemStyle: { color: '#25D366' },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 380 }} />;
}
