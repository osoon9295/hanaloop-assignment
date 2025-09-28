import { fetchCompanies } from '@/lib/api';
import type { Company } from '@/types/types';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  let companies: Company[] = [];
  let error: string | null = null;

  try {
    companies = await fetchCompanies();
  } catch (err) {
    error = err instanceof Error ? err.message : '회사를 불러오지 못했습니다.';
  }

  return <DashboardClient companies={companies} error={error} />;
}
