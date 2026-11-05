import { useTranslation } from 'react-i18next';

import styles from './sidebar.module.scss';

type SidebarLogoProps = {
  isCollapsed: boolean;
};

const SidebarLogo = ({ isCollapsed }: SidebarLogoProps) => {
  const { t } = useTranslation();

  return <div className={styles.logo}>{!isCollapsed && <p className={styles.logoText}>{t('generic.appName')}</p>}</div>;
};

export default SidebarLogo;
