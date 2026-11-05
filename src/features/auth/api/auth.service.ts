import { BaseService } from '@lib/api/base.service';

import { generateCodeChallenge, generateCodeVerifier } from '../utils/pkce';
import type { CurrentUser, TokenExchangeRequest } from './auth.types';

interface ApiEnvelope<T> {
  status: 'success' | 'error';
  data: T;
  error?: string;
}

const PKCE_VERIFIER_KEY = 'pkce_code_verifier';
const OAUTH_STATE_KEY = 'oauth_state';

class AuthService extends BaseService {
  async initiateLogin(): Promise<void> {
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    const state = generateCodeVerifier();
    sessionStorage.setItem(PKCE_VERIFIER_KEY, verifier);
    sessionStorage.setItem(OAUTH_STATE_KEY, state);

    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_AZURE_CLIENT_ID,
      response_type: 'code',
      redirect_uri: `${window.location.origin}/auth-callback`,
      code_challenge: challenge,
      code_challenge_method: 'S256',
      scope: 'openid profile email offline_access',
      state,
    });

    window.location.href = `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}/oauth2/v2.0/authorize?${params}`;
  }

  validateAndClearState(state: string): boolean {
    const stored = sessionStorage.getItem(OAUTH_STATE_KEY);
    sessionStorage.removeItem(OAUTH_STATE_KEY);
    return stored !== null && stored === state;
  }

  async exchangeToken(code: string): Promise<CurrentUser> {
    const code_verifier = sessionStorage.getItem(PKCE_VERIFIER_KEY);
    sessionStorage.removeItem(PKCE_VERIFIER_KEY);
    if (!code_verifier) throw new Error('PKCE verifier ontbreekt — log opnieuw in.');
    const result = await this.post<TokenExchangeRequest, ApiEnvelope<CurrentUser>>('/auth/token', {
      code,
      code_verifier,
    });
    return result.data;
  }

  async getCurrentUser(): Promise<CurrentUser> {
    const result = await this.get<ApiEnvelope<CurrentUser>>('/auth/me');
    return result.data;
  }

  async logout(): Promise<void> {
    await this.post<undefined, unknown>('/auth/logout');
  }

  async devLogin(role: string): Promise<CurrentUser> {
    const result = await this.get<ApiEnvelope<CurrentUser>>(`/dev/login/${role}`);
    return result.data;
  }
}

export const authService = new AuthService();
