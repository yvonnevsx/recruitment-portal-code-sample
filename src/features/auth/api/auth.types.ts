export interface TokenExchangeRequest {
  code: string;
  code_verifier: string;
}

export interface CurrentUser {
  id: string;
  email: string;
  displayName: string;
  roles: string[];
}
