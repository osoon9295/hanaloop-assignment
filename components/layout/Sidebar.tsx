import { LayoutDashboard, Settings } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
  return (
    <aside className="h-screen w-[20rem] bg-gray-50 p-4 shadow-lg">
      <div className="p-4 text-lg font-semibold">Emissions</div>
      <nav className="flex flex-col gap-2 p-2">
        <Link
          href="/dashboard"
          className="hover:text- flex flex-row gap-2 rounded px-3 py-2 hover:bg-gray-100"
        >
          <LayoutDashboard />
          Dashboard
        </Link>
        <Link href="/settings" className="flex flex-row gap-2 rounded px-3 py-2 hover:bg-gray-100">
          <Settings />
          Settings
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
