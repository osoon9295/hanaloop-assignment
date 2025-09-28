'use client';

import { useEffect, useState } from 'react';
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
import { fetchCompanyById } from '@/lib/api';
import type { GhgEmission } from '@/types/types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

type EmissionChartProps = {
  companyId: string | null;
};

export function EmissionChart({ companyId }: EmissionChartProps) {
  const [emissions, setEmissions] = useState<GhgEmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (!companyId) {
      setEmissions([]);
      setLoading(false);
      setError(null);
      return () => {
        cancelled = true;
      };
    }

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const companyRecord = await fetchCompanyById(companyId);
        if (cancelled) return;
        setEmissions(companyRecord?.emissions ?? []);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : '데이터를 불러오지 못했습니다.');
        setEmissions([]);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [companyId]);

  if (!companyId) {
    return (
      <div className="flex h-full items-center justify-center rounded border border-dashed border-gray-300 text-gray-500">
        회사를 선택해 주세요.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-[80%] items-center justify-center text-gray-500">
        차트를 불러오는 중입니다…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center rounded border border-red-200 bg-red-50 text-red-600">
        {error}
      </div>
    );
  }

  if (emissions.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded border border-gray-200 text-gray-500">
        배출 데이터가 없습니다.
      </div>
    );
  }

  const labels = emissions.map((item) => item.yearMonth);
  const values = emissions.map((item) => item.emissions);

  const data = {
    labels,
    datasets: [
      {
        label: '배출량',
        data: values,
        borderColor: '#374151',
        backgroundColor: 'rgba(55, 65, 81, 0.2)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' as const, onClick: () => {} } },
    scales: {
      x: { title: { display: true, text: '월' } },
      y: { title: { display: true, text: 'tCO₂e' } },
    },
  };

  return <Line options={options} data={data} />;
}
