'use client';

import { useEffect, useState } from 'react';
import { EmissionChart } from '@/components/chart/EmissionChart';
import CompanyPanel from '@/components/Info/CompanyPanel';
import type { Company as CompanyEntity } from '@/types/types';

type DashboardClientProps = {
  companies: CompanyEntity[];
  error?: string | null;
};

export default function DashboardClient({ companies, error }: DashboardClientProps) {
  const [selectedCompany, setSelectedCompany] = useState<CompanyEntity | null>(
    companies[0] ?? null,
  );

  useEffect(() => {
    setSelectedCompany((prev) => {
      if (companies.length === 0) return null;
      if (!prev) return companies[0];
      const stillExists = companies.find((candidate) => candidate.id === prev.id);
      return stillExists ?? companies[0];
    });
  }, [companies]);

  return (
    <div className="w-full p-10">
      <h1 className="mb-6 text-2xl font-bold">Carbon Emissions Dashboard</h1>
      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}
      <div className="flex h-[80%] w-full flex-row">
        <div className="flex h-[70%] w-[30%] flex-col gap-4">
          <CompanyPanel companies={companies} onSelectChange={setSelectedCompany} />
        </div>
        <div className="m-4 flex h-[70%] w-[70%] flex-col justify-center rounded border-2 border-gray-300 p-4">
          <EmissionChart companyId={selectedCompany?.id ?? null} />
        </div>
      </div>
    </div>
  );
}
