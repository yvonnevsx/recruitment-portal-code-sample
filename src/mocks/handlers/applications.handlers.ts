import { HttpResponse, http } from 'msw';

import { API_URL } from '../config';
import { applicationStatusesData } from '../data/application-statuses.data';
import { persist, store } from '../store';
import { paginate } from '../utils';

export const applicationsHandlers = [
  http.get(`${API_URL}/applications`, ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase();
    const statusId = url.searchParams.get('status_id');
    const vacancyId = url.searchParams.get('vacancy_id');
    const assignedBy = url.searchParams.get('assigned_by');

    let results = [...store.applications];

    if (search) {
      results = results.filter((a) => {
        const name = `${a.applicant?.first_name} ${a.applicant?.last_name}`.toLowerCase();
        return name.includes(search);
      });
    }
    if (statusId) results = results.filter((a) => a.status_id === statusId);
    if (vacancyId) results = results.filter((a) => a.vacancy_id === vacancyId);
    if (assignedBy) results = results.filter((a) => a.assigned_by === assignedBy);

    return HttpResponse.json(paginate(results, url));
  }),

  http.get(`${API_URL}/applications/:id`, ({ params }) => {
    const application = store.applications.find((a) => a.id === params.id);
    if (!application) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(application);
  }),

  http.patch(`${API_URL}/applications/:id/status`, async ({ params, request }) => {
    const index = store.applications.findIndex((a) => a.id === params.id);
    if (index === -1) return new HttpResponse(null, { status: 404 });
    const body = (await request.json()) as { status_id: string };
    const status = applicationStatusesData.find((s) => s.id === body.status_id);
    store.applications[index] = {
      ...store.applications[index],
      status_id: body.status_id,
      status,
      updated_at: new Date().toISOString(),
    };
    persist('msw_applications', store.applications);
    return HttpResponse.json(store.applications[index]);
  }),

  http.patch(`${API_URL}/applications/:id/assign`, async ({ params, request }) => {
    const index = store.applications.findIndex((a) => a.id === params.id);
    if (index === -1) return new HttpResponse(null, { status: 404 });
    const body = (await request.json()) as { assigned_by: string; interview_by?: string };
    store.applications[index] = {
      ...store.applications[index],
      ...body,
      updated_at: new Date().toISOString(),
    };
    persist('msw_applications', store.applications);
    return HttpResponse.json(store.applications[index]);
  }),

  http.get(`${API_URL}/applications/:id/notes`, ({ params }) => {
    const applicationNotes = store.notes.filter((n) => n.application_id === params.id);
    return HttpResponse.json(applicationNotes);
  }),

  http.post(`${API_URL}/applications/:id/notes`, async ({ params, request }) => {
    const body = (await request.json()) as { note: string };
    const newNote = {
      id: `note-${Date.now()}`,
      application_id: params.id as string,
      user_id: 'user-eva',
      note: body.note,
      created_at: new Date().toISOString(),
    };
    store.notes.push(newNote);
    persist('msw_notes', store.notes);
    return HttpResponse.json(newNote, { status: 201 });
  }),

  http.patch(`${API_URL}/applications/:id/notes/:noteId`, async ({ params, request }) => {
    const body = (await request.json()) as { note: string };
    const index = store.notes.findIndex((n) => n.id === params.noteId);
    if (index === -1) return new HttpResponse(null, { status: 404 });
    store.notes[index] = { ...store.notes[index], note: body.note };
    persist('msw_notes', store.notes);
    return HttpResponse.json(store.notes[index]);
  }),

  http.delete(`${API_URL}/applications/:id/notes/:noteId`, ({ params }) => {
    store.notes = store.notes.filter((n) => n.id !== params.noteId);
    persist('msw_notes', store.notes);
    return new HttpResponse(null, { status: 204 });
  }),

  http.get(`${API_URL}/application-statuses`, () => {
    return HttpResponse.json(applicationStatusesData);
  }),
];
