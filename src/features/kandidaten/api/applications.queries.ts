import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { applicationsService } from './applications.service';
import type {
  ApplicationsParams,
  AssignApplicationRequest,
  NoteRequest,
  UpdateApplicationStatusRequest,
} from './applications.types';

export const applicationsQueryKeys = {
  all: ['applications'] as const,
  list: (params?: ApplicationsParams) => [...applicationsQueryKeys.all, 'list', params] as const,
  listAll: () => [...applicationsQueryKeys.all, 'list', 'all'] as const,
  detail: (id: string) => [...applicationsQueryKeys.all, 'detail', id] as const,
  notes: (id: string) => [...applicationsQueryKeys.all, 'notes', id] as const,
  statuses: () => [...applicationsQueryKeys.all, 'statuses'] as const,
};

export function useApplications(params?: ApplicationsParams) {
  return useQuery({
    queryKey: applicationsQueryKeys.list(params),
    queryFn: () => applicationsService.getAll(params),
  });
}

export function useAllApplications() {
  return useQuery({
    queryKey: applicationsQueryKeys.listAll(),
    queryFn: () => applicationsService.getAllPages(),
  });
}

export function useApplication(id: string) {
  return useQuery({
    queryKey: applicationsQueryKeys.detail(id),
    queryFn: () => applicationsService.getById(id),
    enabled: !!id,
  });
}

export function useApplicationNotes(id: string) {
  return useQuery({
    queryKey: applicationsQueryKeys.notes(id),
    queryFn: () => applicationsService.getNotes(id),
    enabled: !!id,
  });
}

export function useApplicationStatuses() {
  return useQuery({
    queryKey: applicationsQueryKeys.statuses(),
    queryFn: () => applicationsService.getStatuses(),
    staleTime: Infinity,
  });
}

export function useUpdateApplicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateApplicationStatusRequest }) =>
      applicationsService.updateStatus(id, body),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: applicationsQueryKeys.all });
      queryClient.setQueryData(applicationsQueryKeys.detail(updated.id), updated);
    },
  });
}

export function useAssignApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: AssignApplicationRequest }) => applicationsService.assign(id, body),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: applicationsQueryKeys.all });
      queryClient.setQueryData(applicationsQueryKeys.detail(updated.id), updated);
    },
  });
}

export function useAddNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: NoteRequest }) => applicationsService.addNote(id, body),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: applicationsQueryKeys.notes(id) });
    },
  });
}

export function useUpdateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ applicationId, noteId, body }: { applicationId: string; noteId: string; body: NoteRequest }) =>
      applicationsService.updateNote(applicationId, noteId, body),
    onSuccess: (_, { applicationId }) => {
      queryClient.invalidateQueries({ queryKey: applicationsQueryKeys.notes(applicationId) });
    },
  });
}

export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ applicationId, noteId }: { applicationId: string; noteId: string }) =>
      applicationsService.deleteNote(applicationId, noteId),
    onSuccess: (_, { applicationId }) => {
      queryClient.invalidateQueries({ queryKey: applicationsQueryKeys.notes(applicationId) });
    },
  });
}
