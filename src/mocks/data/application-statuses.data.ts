import type { ApplicationStatus } from '@features/kandidaten/api/applications.types';

export const applicationStatusesData: ApplicationStatus[] = [
  { id: 'status-01', name: 'Nieuw' },
  { id: 'status-02', name: 'Doorgestuurd' },
  { id: 'status-03', name: 'Eerste gesprek' },
  { id: 'status-04', name: 'Tweede gesprek' },
  { id: 'status-05', name: 'Aanbieding' },
  { id: 'status-06', name: 'Aangenomen' },
  { id: 'status-07', name: 'Afgewezen' },
];
