import { BaseService } from '@lib/api/base.service';
import type { PaginatedResponse } from '@lib/api/types';

import type {
  Application,
  ApplicationNote,
  ApplicationStatus,
  ApplicationsParams,
  AssignApplicationRequest,
  NoteRequest,
  UpdateApplicationStatusRequest,
} from './applications.types';

const ALL_PAGES_PAGE_SIZE = 100;

class ApplicationsService extends BaseService {
  private readonly endpoint = 'applications';

  getAll(params?: ApplicationsParams): Promise<PaginatedResponse<Application>> {
    return this.get(this.endpoint, { params });
  }

  // Fetches all pages for client-side filtering
  async getAllPages(params?: Omit<ApplicationsParams, 'page' | 'pageSize'>): Promise<Application[]> {
    const firstPage = await this.getAll({ ...params, page: 1, pageSize: ALL_PAGES_PAGE_SIZE });
    const remainingPages = await Promise.all(
      Array.from({ length: firstPage.totalPages - 1 }, (_, index) =>
        this.getAll({ ...params, page: index + 2, pageSize: ALL_PAGES_PAGE_SIZE })
      )
    );

    return [firstPage, ...remainingPages].flatMap((response) => response.data);
  }

  getById(id: string): Promise<Application> {
    return this.get(`${this.endpoint}/${id}`);
  }

  updateStatus(id: string, body: UpdateApplicationStatusRequest): Promise<Application> {
    return this.patch<UpdateApplicationStatusRequest, Application>(`${this.endpoint}/${id}/status`, body);
  }

  assign(id: string, body: AssignApplicationRequest): Promise<Application> {
    return this.patch<AssignApplicationRequest, Application>(`${this.endpoint}/${id}/assign`, body);
  }

  getNotes(id: string): Promise<ApplicationNote[]> {
    return this.get(`${this.endpoint}/${id}/notes`);
  }

  addNote(id: string, body: NoteRequest): Promise<ApplicationNote> {
    return this.post<NoteRequest, ApplicationNote>(`${this.endpoint}/${id}/notes`, body);
  }

  updateNote(applicationId: string, noteId: string, body: NoteRequest): Promise<ApplicationNote> {
    return this.patch<NoteRequest, ApplicationNote>(`${this.endpoint}/${applicationId}/notes/${noteId}`, body);
  }

  deleteNote(applicationId: string, noteId: string): Promise<void> {
    return super.delete(`${this.endpoint}/${applicationId}/notes/${noteId}`);
  }

  getStatuses(): Promise<ApplicationStatus[]> {
    return this.get('application-statuses');
  }
}

export const applicationsService = new ApplicationsService();
