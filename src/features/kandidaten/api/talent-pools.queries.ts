import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { talentPoolsService } from './talent-pools.service';
import type { AddTalentPoolMemberRequest } from './talent-pools.types';

export const talentPoolsQueryKeys = {
  all: ['talent-pools'] as const,
  list: () => [...talentPoolsQueryKeys.all, 'list'] as const,
  detail: (id: string) => [...talentPoolsQueryKeys.all, 'detail', id] as const,
  members: (id: string) => [...talentPoolsQueryKeys.all, 'members', id] as const,
};

export function useTalentPools() {
  return useQuery({
    queryKey: talentPoolsQueryKeys.list(),
    queryFn: () => talentPoolsService.getAll(),
  });
}

export function useTalentPool(id: string) {
  return useQuery({
    queryKey: talentPoolsQueryKeys.detail(id),
    queryFn: () => talentPoolsService.getById(id),
    enabled: !!id,
  });
}

export function useTalentPoolMembers(id: string) {
  return useQuery({
    queryKey: talentPoolsQueryKeys.members(id),
    queryFn: () => talentPoolsService.getMembers(id),
    enabled: !!id,
  });
}

export function useAddTalentPoolMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: AddTalentPoolMemberRequest }) =>
      talentPoolsService.addMember(id, body),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: talentPoolsQueryKeys.members(id) });
    },
  });
}

export function useRemoveTalentPoolMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, applicantId }: { id: string; applicantId: string }) =>
      talentPoolsService.removeMember(id, applicantId),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: talentPoolsQueryKeys.members(id) });
    },
  });
}
