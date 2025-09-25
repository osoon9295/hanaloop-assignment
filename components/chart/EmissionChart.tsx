'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export function EmissionChart() {
  const data = {
    labels: ['2024-01', '2024-02', '2024-03'],
    datasets: [
      {
        label: '배출량',
        data: [120, 98, 140],
        borderColor: '#374151',
        backgroundColor: 'rgba(55, 65, 81, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: 'top' as const } },
  };

  return <Line options={options} data={data} />;
}
