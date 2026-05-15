import ReactECharts from 'echarts-for-react';
import type { BarChartData } from '@/core/types/stat-result';

const darkAxis = {
  axisLine: { lineStyle: { color: '#2E3D43' } },
  axisLabel: { color: '#8696A0' },
  splitLine: { lineStyle: { color: '#2E3D43' } },
  nameTextStyle: { color: '#8696A0' },
};

export function BarChart({ data }: { data: BarChartData }) {
  const horizontal = data.horizontal ?? false;

  const option = {
    backgroundColor: 'transparent',
    textStyle: { color: '#8696A0', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1F2C33',
      borderColor: '#2E3D43',
      textStyle: { color: '#E9EDEF' },
    },
    grid: { left: horizontal ? 120 : 50, right: 20, top: 30, bottom: 70, containLabel: true },
    xAxis: horizontal
      ? { type: 'value', name: data.yLabel, nameLocation: 'middle', nameGap: 30, ...darkAxis }
      : { type: 'category', data: data.labels, name: data.xLabel, nameLocation: 'middle', nameGap: 40, ...darkAxis },
    yAxis: horizontal
      ? { type: 'category', data: data.labels, name: data.xLabel, nameLocation: 'middle', nameGap: 60, ...darkAxis }
      : { type: 'value', name: data.yLabel, ...darkAxis },
    series: [
      {
        type: 'bar',
        data: data.values,
        itemStyle: { color: '#00A884', borderRadius: [3, 3, 0, 0] },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 'clamp(260px, 60vw, 380px)' }} />;
}
