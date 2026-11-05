import type { CurrentUser } from '@features/auth/api/auth.types';

export const currentUserData: CurrentUser = {
  id: '1',
  email: 'ats-admin@example.com',
  displayName: 'ATS Administrator',
  roles: ['hr_worker', 'admin'],
};

export const usersByRole: Record<string, CurrentUser> = {
  admin: { id: '1', email: 'ats-admin@example.com', displayName: 'ATS Administrator', roles: ['hr_worker', 'admin'] },
  hr_worker: { id: '2', email: 'hr@example.com', displayName: 'HR Worker', roles: ['hr_worker'] },
};
