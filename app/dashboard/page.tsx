import { EmissionChart } from '@/components/chart/EmissionChart';
import Company from '@/components/Info/Company';
import Sum from '@/components/Info/Sum';

const page = () => {
  return (
    <div className="w-full p-10">
      <h1 className="mb-6 text-2xl font-bold">Carbon Emissions Dashboard</h1>
      <div className="flex h-[80%] w-full flex-row">
        <div className="w-[30%] bg-red-50">
          <Company />
          <Sum />
        </div>
        <div className="m-4 h-full w-full p-4">
          <EmissionChart />
        </div>
      </div>
    </div>
  );
};

export default page;
