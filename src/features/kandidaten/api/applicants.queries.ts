import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { applicantsService } from './applicants.service';
import type { ApplicantsParams } from './applicants.types';

export const applicantsQueryKeys = {
  all: ['applicants'] as const,
  list: (params?: ApplicantsParams) => [...applicantsQueryKeys.all, 'list', params] as const,
  detail: (id: string) => [...applicantsQueryKeys.all, 'detail', id] as const,
};

export function useApplicants(params?: ApplicantsParams) {
  return useQuery({
    queryKey: applicantsQueryKeys.list(params),
    queryFn: () => applicantsService.getAll(params),
  });
}

export function useApplicant(id: string) {
  return useQuery({
    queryKey: applicantsQueryKeys.detail(id),
    queryFn: () => applicantsService.getById(id),
    enabled: !!id,
  });
}

export function useArchiveApplicant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => applicantsService.archive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicantsQueryKeys.all });
    },
  });
}

export function useAddApplicantToTalentPool() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => applicantsService.addToTalentPool(id),
    onSuccess: (updated) => {
      queryClient.setQueryData(applicantsQueryKeys.detail(updated.id), updated);
    },
  });
}
