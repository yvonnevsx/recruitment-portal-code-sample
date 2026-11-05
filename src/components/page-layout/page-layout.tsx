import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router';

import { useAuth } from '@features/auth/api/auth.mutations';

import { Sidebar } from '../sidebar';

import styles from './page-layout.module.scss';

const getPageTitleKey = (pathname: string) => {
  if (pathname.startsWith('/kandidaten/')) {
    return 'features.pages.candidate';
  }

  return 'features.pages.candidates';
};

export const PageLayout = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { user } = useAuth();
  const pageTitle = t(getPageTitleKey(pathname));

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>{pageTitle}</h1>
          {user && <span>{user.displayName}</span>}
        </header>
        <Outlet />
      </main>
    </div>
  );
};
