'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Company as CompanyEntity } from '@/types/types';

type CompanyOptionProps = {
  company: CompanyEntity | null;
  index: number;
  totalCount: number;
  onPrev: () => void;
  onNext: () => void;
};

const CompanyOption = ({ company, index, totalCount, onPrev, onNext }: CompanyOptionProps) => {
  const disabled = totalCount === 0;
  const name = company?.name ?? '회사 없음';

  return (
    <div className="rounded-md border-2 border-gray-300 p-4 font-semibold">
      <div className="mb-2 flex items-center justify-between text-sm text-gray-500">
        <span>Company</span>
        {totalCount > 0 && (
          <span>
            {index + 1} / {totalCount}
          </span>
        )}
      </div>

      <div className="flex h-[5rem] items-center justify-between gap-4 rounded-md bg-gray-100 px-4 py-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={disabled}
          aria-label="이전 회사"
          className="rounded-full p-2 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft />
        </button>
        <span className="text-md flex-1 text-center font-medium">{name}</span>
        <button
          type="button"
          onClick={onNext}
          disabled={disabled}
          aria-label="다음 회사"
          className="rounded-full p-2 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default CompanyOption;
