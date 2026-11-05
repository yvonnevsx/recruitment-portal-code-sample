import type { TalentPool, TalentPoolMember } from '@features/kandidaten/api/talent-pools.types';

export const talentPoolsData: TalentPool[] = [
  {
    id: 'tp-01',
    name: 'Frontend Talent',
    description: 'Kandidaten met frontend-expertise voor toekomstige vacatures.',
    created_at: '2025-06-01T00:00:00Z',
  },
  {
    id: 'tp-02',
    name: 'Design Talent',
    description: 'UX/UI designers en product designers voor toekomstige openingen.',
    created_at: '2025-08-01T00:00:00Z',
  },
  {
    id: 'tp-03',
    name: 'Backend Talent',
    description: 'Backend developers met ervaring in Node.js, Java of .NET.',
    created_at: '2025-09-01T00:00:00Z',
  },
];

export const talentPoolMembersData: TalentPoolMember[] = [
  {
    id: 'tpm-01',
    talent_pool_id: 'tp-01',
    applicant_id: 'app-02',
    added_at: '2026-03-19T10:00:00Z',
    note: 'Sterke frontend kandidaat, niet aangenomen wegens timing.',
  },
  {
    id: 'tpm-02',
    talent_pool_id: 'tp-01',
    applicant_id: 'app-10',
    added_at: '2025-12-20T10:00:00Z',
    note: null,
  },
  {
    id: 'tpm-03',
    talent_pool_id: 'tp-02',
    applicant_id: 'app-01',
    added_at: '2026-03-21T09:00:00Z',
    note: 'Interessant portfolio, goede aandacht voor detail.',
  },
];
