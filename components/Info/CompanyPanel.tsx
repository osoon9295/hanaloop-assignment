'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Company as CompanyEntity } from '@/types/types';
import CompanyOption from './CompanyOption';
import Sum from './Sum';

type CompanyPanelProps = {
  companies: CompanyEntity[];
  onSelectChange?: (company: CompanyEntity | null) => void;
};

const CompanyPanel = ({ companies, onSelectChange }: CompanyPanelProps) => {
  const [index, setIndex] = useState(0);

  const totalCount = companies.length;
  const activeCompany = totalCount > 0 ? companies[index] : null;

  useEffect(() => {
    setIndex(0);
  }, [companies]);

  useEffect(() => {
    if (totalCount === 0) return;
    if (index >= totalCount) {
      setIndex(0);
    }
  }, [index, totalCount]);

  useEffect(() => {
    onSelectChange?.(activeCompany ?? null);
  }, [activeCompany, onSelectChange]);

  const handlePrev = () => {
    if (totalCount === 0) return;
    setIndex((prev) => (prev - 1 + totalCount) % totalCount);
  };

  const handleNext = () => {
    if (totalCount === 0) return;
    setIndex((prev) => (prev + 1) % totalCount);
  };

  const totalEmissions = useMemo(() => {
    if (!activeCompany) return 0;
    return activeCompany.emissions.reduce((sum, emission) => sum + emission.emissions, 0);
  }, [activeCompany]);

  return (
    <div className="flex h-full w-full flex-col justify-center gap-4">
      <CompanyOption
        company={activeCompany}
        index={index}
        totalCount={totalCount}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      <Sum company={activeCompany} totalEmissions={totalEmissions} />
    </div>
  );
};

export default CompanyPanel;
