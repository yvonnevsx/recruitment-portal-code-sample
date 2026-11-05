import AuthCallbackPage from '../pages/auth-callback-page';
import ForbiddenPage from '../pages/forbidden-page';
import LoginPage from '../pages/login-page';

export const authRoutes = [
  { path: '/login', Component: LoginPage },
  { path: '/auth-callback', Component: AuthCallbackPage },
  { path: '/forbidden', Component: ForbiddenPage },
];
