export interface Applicant {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  linkedin_url: string | null;
  source_mail_id: string | null;
  consent_talent_pool: boolean;
  consent_given_at: string | null;
  retention_until: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApplicantsParams {
  search?: string;
  consent_talent_pool?: boolean;
  archived?: boolean;
  page?: number;
  pageSize?: number;
}
