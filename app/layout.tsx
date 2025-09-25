import Sidebar from '@/components/layout/Sidebar';
import './globals.css';

export const metadata = {
  title: 'Emissions Dashboard',
  description: 'Carbon emissions dashboard MVP',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex flex-row">
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
