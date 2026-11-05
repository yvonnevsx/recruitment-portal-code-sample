import { HttpResponse, http } from 'msw';

import { API_URL } from '../config';
import { talentPoolsData } from '../data/talent-pools.data';
import { persist, store } from '../store';

export const talentPoolsHandlers = [
  http.get(`${API_URL}/talent-pools`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') ?? 1);
    const pageSize = Number(url.searchParams.get('pageSize') ?? 10);
    const start = (page - 1) * pageSize;

    return HttpResponse.json({
      data: talentPoolsData.slice(start, start + pageSize),
      total: talentPoolsData.length,
      page,
      pageSize,
      totalPages: Math.ceil(talentPoolsData.length / pageSize),
    });
  }),

  http.get(`${API_URL}/talent-pools/:id`, ({ params }) => {
    const pool = talentPoolsData.find((p) => p.id === params.id);
    if (!pool) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(pool);
  }),

  http.get(`${API_URL}/talent-pools/:id/members`, ({ params }) => {
    return HttpResponse.json(store.members.filter((m) => m.talent_pool_id === params.id));
  }),

  http.post(`${API_URL}/talent-pools/:id/members`, async ({ params, request }) => {
    const body = (await request.json()) as { applicant_id: string; note?: string };
    const newMember = {
      id: `tpm-${Date.now()}`,
      talent_pool_id: params.id as string,
      applicant_id: body.applicant_id,
      added_at: new Date().toISOString(),
      note: body.note ?? null,
    };
    store.members.push(newMember);
    persist('msw_members', store.members);
    return HttpResponse.json(newMember, { status: 201 });
  }),

  http.delete(`${API_URL}/talent-pools/:id/members/:applicantId`, ({ params }) => {
    store.members = store.members.filter(
      (m) => !(m.talent_pool_id === params.id && m.applicant_id === params.applicantId)
    );
    persist('msw_members', store.members);
    return new HttpResponse(null, { status: 204 });
  }),
];
