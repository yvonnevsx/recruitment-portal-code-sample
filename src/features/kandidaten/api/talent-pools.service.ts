import { BaseService } from '@lib/api/base.service';
import type { PaginatedResponse } from '@lib/api/types';

import type { AddTalentPoolMemberRequest, TalentPool, TalentPoolMember } from './talent-pools.types';

class TalentPoolsService extends BaseService {
  private readonly endpoint = 'talent-pools';

  getAll(): Promise<PaginatedResponse<TalentPool>> {
    return this.get(this.endpoint);
  }

  getById(id: string): Promise<TalentPool> {
    return this.get(`${this.endpoint}/${id}`);
  }

  getMembers(id: string): Promise<TalentPoolMember[]> {
    return this.get(`${this.endpoint}/${id}/members`);
  }

  addMember(id: string, body: AddTalentPoolMemberRequest): Promise<TalentPoolMember> {
    return this.post<AddTalentPoolMemberRequest, TalentPoolMember>(`${this.endpoint}/${id}/members`, body);
  }

  removeMember(id: string, applicantId: string): Promise<void> {
    return super.delete(`${this.endpoint}/${id}/members/${applicantId}`);
  }
}

export const talentPoolsService = new TalentPoolsService();
