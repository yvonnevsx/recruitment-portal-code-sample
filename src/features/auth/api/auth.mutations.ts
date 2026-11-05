import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { authService } from './auth.service';

export const postLoginRedirectKey = 'post_login_redirect';

const getRedirectTarget = () => {
  const target = sessionStorage.getItem(postLoginRedirectKey);
  sessionStorage.removeItem(postLoginRedirectKey);
  // Only allow same-origin paths: '//host' and '/\host' would redirect to another domain
  if (target && target.startsWith('/') && !target.startsWith('//') && !target.startsWith('/\\')) {
    return target;
  }
  return '/';
};

const currentUserQueryKey = ['auth', 'me'] as const;

export function useCurrentUser() {
  return useQuery({
    queryKey: currentUserQueryKey,
    queryFn: () => authService.getCurrentUser(),
    retry: false,
  });
}

export function useAuth() {
  const query = useCurrentUser();

  return {
    ...query,
    user: query.data,
    isAuthenticated: Boolean(query.data) && !query.isError,
  };
}

export function useExchangeToken() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (code: string) => authService.exchangeToken(code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: currentUserQueryKey });
      navigate(getRedirectTarget());
    },
  });
}

export function useDevLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (role: string) => authService.devLogin(role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: currentUserQueryKey });
      navigate(getRedirectTarget());
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear();
      sessionStorage.removeItem(postLoginRedirectKey);
      navigate('/login');
    },
  });
}
