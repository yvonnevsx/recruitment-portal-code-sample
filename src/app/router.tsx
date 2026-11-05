import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { PageLayout } from '../components/page-layout/page-layout';
import { AuthGuard } from '../features/auth/components/auth-guard';
import { authRoutes } from '../features/auth/routes';
import { kandidatenRoutes } from '../features/kandidaten/routes';

const featureRoutes = [...kandidatenRoutes];

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {authRoutes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          Component={Component}
        />
      ))}
      <Route element={<AuthGuard />}>
        <Route element={<PageLayout />}>
          <Route
            index
            element={
              <Navigate
                to="/kandidaten"
                replace
              />
            }
          />
          {featureRoutes.map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              Component={Component}
            />
          ))}
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
