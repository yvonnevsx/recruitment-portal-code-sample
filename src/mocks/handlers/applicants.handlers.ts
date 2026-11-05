import { HttpResponse, http } from 'msw';

import { API_URL } from '../config';
import { applicantsData } from '../data/applicants.data';
import { paginate } from '../utils';

export const applicantsHandlers = [
  http.get(`${API_URL}/applicants`, ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase();
    const archived = url.searchParams.get('archived') === 'true';

    let results = applicantsData.filter((a) => (archived ? a.deleted_at !== null : a.deleted_at === null));

    if (search) {
      results = results.filter(
        (a) =>
          a.first_name.toLowerCase().includes(search) ||
          a.last_name.toLowerCase().includes(search) ||
          a.email.toLowerCase().includes(search)
      );
    }

    return HttpResponse.json(paginate(results, url));
  }),

  http.get(`${API_URL}/applicants/:id`, ({ params }) => {
    const applicant = applicantsData.find((a) => a.id === params.id);
    if (!applicant) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(applicant);
  }),

  http.patch(`${API_URL}/applicants/:id/archive`, ({ params }) => {
    const applicant = applicantsData.find((a) => a.id === params.id);
    if (!applicant) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json({ ...applicant, deleted_at: new Date().toISOString() });
  }),

  http.patch(`${API_URL}/applicants/:id/talent-pool`, ({ params }) => {
    const applicant = applicantsData.find((a) => a.id === params.id);
    if (!applicant) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json({ ...applicant, consent_talent_pool: true });
  }),
];
