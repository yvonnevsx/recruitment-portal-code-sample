import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';

import { useExchangeToken } from '../api/auth.mutations';
import { authService } from '../api/auth.service';

const AuthCallbackPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { mutate, isPending, isError } = useExchangeToken();
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      setAuthError(searchParams.get('error_description') ?? error);
      return;
    }

    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code || !state || !authService.validateAndClearState(state)) {
      setAuthError(t('features.auth.callback.invalidState'));
      return;
    }

    mutate(code);
  }, [searchParams, mutate, t]);

  if (authError || isError) {
    return (
      <p>
        {authError ?? t('features.auth.callback.failed')} <a href="/login">{t('features.auth.callback.retry')}</a>.
      </p>
    );
  }

  return <p>{isPending ? t('features.auth.callback.exchangingToken') : t('features.auth.callback.loggingIn')}</p>;
};

export default AuthCallbackPage;
