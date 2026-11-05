import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const ForbiddenPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div>
      <h1>{t('features.auth.forbidden.title')}</h1>
      <p>{t('features.auth.forbidden.description')}</p>
      <button onClick={() => navigate(-1)}>{t('features.auth.forbidden.back')}</button>
    </div>
  );
};

export default ForbiddenPage;
