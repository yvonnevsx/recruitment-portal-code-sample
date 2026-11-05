import { HttpResponse, http } from 'msw';

import { API_URL } from '../config';
import { currentUserData, usersByRole } from '../data/auth.data';

// Tracks mock session state in dev mode
let sessionActive = false;

export const authHandlers = [
  http.post(`${API_URL}/auth/token`, () => {
    sessionActive = true;
    return HttpResponse.json({ status: 'success', data: currentUserData });
  }),

  http.get(`${API_URL}/auth/me`, () => {
    if (!sessionActive) {
      return HttpResponse.json({ status: 'error', error: 'Unauthorized' }, { status: 401 });
    }
    return HttpResponse.json({ status: 'success', data: currentUserData });
  }),

  http.post(`${API_URL}/auth/logout`, () => {
    sessionActive = false;
    return HttpResponse.json({ status: 'success', data: {} });
  }),

  http.get(`${API_URL}/dev/login/:role`, ({ params }) => {
    const role = params.role as string;
    sessionActive = true;
    const user = usersByRole[role] ?? { ...currentUserData, roles: [role] };
    return HttpResponse.json({ status: 'success', data: user });
  }),
];
