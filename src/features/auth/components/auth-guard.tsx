import { Navigate, Outlet, useLocation } from 'react-router';

import { useAuth } from '../api/auth.mutations';

export const AuthGuard = () => {
  const location = useLocation();
  const { isLoading, isError } = useAuth();

  if (isLoading) return null;
  if (isError)
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );

  return <Outlet />;
};
