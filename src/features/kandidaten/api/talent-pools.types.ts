export interface TalentPool {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export interface TalentPoolMember {
  id: string;
  talent_pool_id: string;
  applicant_id: string;
  added_at: string;
  note: string | null;
}

export interface CreateTalentPoolRequest {
  name: string;
  description?: string;
}

export interface UpdateTalentPoolRequest {
  name?: string;
  description?: string;
}

export interface AddTalentPoolMemberRequest {
  applicant_id: string;
  note?: string;
}
