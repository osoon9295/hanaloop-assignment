'use client';

import type { Company as CompanyEntity } from '@/types/types';

type SumProps = {
  company: CompanyEntity | null;
  totalEmissions: number;
};

const Sum = ({ company, totalEmissions }: SumProps) => {
  const formatter = new Intl.NumberFormat('ko-KR', {
    maximumFractionDigits: 1,
  });

  return (
    <div className="rounded-md border-2 border-gray-300 p-4">
      <h2 className="mb-3 text-lg font-semibold">총 배출량</h2>
      {company ? (
        <div>
          <p className="text-sm text-gray-500">{company.name}</p>
          <p className="text-2xl font-bold text-gray-800">{formatter.format(totalEmissions)} tCO₂e</p>
        </div>
      ) : (
        <p className="text-sm text-gray-500">회사를 선택해 주세요.</p>
      )}
    </div>
  );
};

export default Sum;
