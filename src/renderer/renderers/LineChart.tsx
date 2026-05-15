import ReactECharts from 'echarts-for-react';
import type { LineChartData } from '@/core/types/stat-result';

const darkAxis = {
  axisLine: { lineStyle: { color: '#2E3D43' } },
  axisLabel: { color: '#8696A0' },
  splitLine: { lineStyle: { color: '#2E3D43' } },
  nameTextStyle: { color: '#8696A0' },
};

export function LineChart({ data }: { data: LineChartData }) {
  const option = {
    backgroundColor: 'transparent',
    textStyle: { color: '#8696A0', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1F2C33',
      borderColor: '#2E3D43',
      textStyle: { color: '#E9EDEF' },
    },
    grid: { left: 60, right: 30, top: 30, bottom: 50, containLabel: true },
    xAxis: { type: 'category', data: data.points.map((p) => p.x), name: data.xLabel, ...darkAxis },
    yAxis: { type: 'value', name: data.yLabel, ...darkAxis },
    series: [
      {
        type: 'line',
        data: data.points.map((p) => p.y),
        smooth: data.smooth ?? true,
        areaStyle: data.area ? { opacity: 0.15, color: '#00A884' } : undefined,
        itemStyle: { color: '#00A884' },
        lineStyle: { color: '#00A884', width: 2 },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 'clamp(260px, 60vw, 380px)' }} />;
}
