import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import { postLoginRedirectKey, useDevLogin } from '../api/auth.mutations';

import styles from './login-page.module.scss';

const LoginPage = () => {
  const { t } = useTranslation();
  const devLogin = useDevLogin();
  const location = useLocation();
  const fromState = (location.state as { from?: { pathname?: string; search?: string } } | null)?.from;
  const redirectTo = fromState ? `${fromState.pathname ?? ''}${fromState.search ?? ''}` : '/';

  return (
    <div className={styles.shell}>
      <section className={styles.card}>
        <header className={styles.header}>
          <p className={styles.brandLabel}>{t('features.auth.login.brandLabel')}</p>
          <h1 className={styles.title}>{t('features.auth.login.title')}</h1>
          <p className={styles.subtitle}>{t('features.auth.login.subtitle')}</p>
        </header>

        {import.meta.env.DEV && (
          <div className={styles.actionArea}>
            <p className={styles.devLabel}>{t('features.auth.login.devMode')}</p>
            <button
              className={styles.devButton}
              onClick={() => {
                sessionStorage.setItem(postLoginRedirectKey, redirectTo);
                devLogin.mutate('admin');
              }}
              disabled={devLogin.isPending}
            >
              {t('features.auth.login.loginAsAdmin')}
            </button>
          </div>
        )}

        <div className={styles.footer}>{t('features.auth.login.footer')}</div>
      </section>
    </div>
  );
};

export default LoginPage;
