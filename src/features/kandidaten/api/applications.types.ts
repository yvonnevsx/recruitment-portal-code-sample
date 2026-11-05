import type { Applicant } from './applicants.types';

export interface ApplicationStatus {
  id: string;
  name: string;
}

export interface ApplicationNote {
  id: string;
  application_id: string;
  user_id: string;
  note: string;
  created_at: string;
}

export interface Application {
  id: string;
  applicant_id: string;
  vacancy_id: string;
  status_id: string;
  assigned_by: string | null;
  interview_by: string | null;
  source_mail_id: string | null;
  applied_at: string;
  updated_at: string;
  // Embedded relations (returned by API)
  applicant?: Applicant;
  status?: ApplicationStatus;
  vacancy?: { id: string; title: string };
  assigned_user?: { id: string; name: string };
}

export interface UpdateApplicationStatusRequest {
  status_id: string;
}

export interface AssignApplicationRequest {
  assigned_by: string;
  interview_by?: string;
}

export interface NoteRequest {
  note: string;
}

export interface ApplicationsParams {
  search?: string;
  status_id?: string;
  vacancy_id?: string;
  assigned_by?: string;
  page?: number;
  pageSize?: number;
}
