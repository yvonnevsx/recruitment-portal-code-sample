import { BaseService } from '@lib/api/base.service';
import type { PaginatedResponse } from '@lib/api/types';

import type { Applicant, ApplicantsParams } from './applicants.types';

class ApplicantsService extends BaseService {
  private readonly endpoint = 'applicants';

  getAll(params?: ApplicantsParams): Promise<PaginatedResponse<Applicant>> {
    return this.get(this.endpoint, { params });
  }

  getById(id: string): Promise<Applicant> {
    return this.get(`${this.endpoint}/${id}`);
  }

  // Soft-delete: zet deleted_at, kandidaat blijft bewaard conform AVG-bewaarplicht
  archive(id: string): Promise<Applicant> {
    return this.patch<undefined, Applicant>(`${this.endpoint}/${id}/archive`);
  }

  addToTalentPool(id: string): Promise<Applicant> {
    return this.patch<undefined, Applicant>(`${this.endpoint}/${id}/talent-pool`);
  }
}

export const applicantsService = new ApplicantsService();
