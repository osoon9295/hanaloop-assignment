import { Company, Post } from '@/types/types';

export const companies: Company[] = [
  {
    id: 'c1',
    name: 'Acme Corp',
    country: 'US',
    emissions: [
      { yearMonth: '2024-01', emissions: 120 },
      { yearMonth: '2024-02', emissions: 110 },
      { yearMonth: '2024-03', emissions: 95 },
    ],
  },
  {
    id: 'c2',
    name: 'Globex',
    country: 'DE',
    emissions: [
      { yearMonth: '2024-01', emissions: 80 },
      { yearMonth: '2024-02', emissions: 105 },
      { yearMonth: '2024-03', emissions: 120 },
    ],
  },
];

export const posts: Post[] = [
  {
    id: 'p1',
    title: 'Sustainability Report',
    resourceUid: 'c1',
    dateTime: '2024-02',
    content: 'Quarterly CO2 update',
  },
];
