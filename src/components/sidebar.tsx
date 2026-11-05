import { CaretLeft, CaretRight } from 'phosphor-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SidebarLogo from './sidebar-logo';
import SidebarNav from './sidebar-nav';
import SidebarUser from './sidebar-user';
import IconButton from './ui/buttons/icon-button';

import styles from './sidebar.module.scss';

export const Sidebar = () => {
  const { t } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles['sidebar--collapsed'] : ''}`}>
      <IconButton
        variant="round"
        icon={isCollapsed ? <CaretRight /> : <CaretLeft />}
        onClick={() => setIsCollapsed(!isCollapsed)}
        title={isCollapsed ? t('components.sidebar.expand') : t('components.sidebar.collapse')}
        className={styles.toggleBtn}
      />

      <SidebarLogo isCollapsed={isCollapsed} />
      <SidebarNav isCollapsed={isCollapsed} />
      <SidebarUser isCollapsed={isCollapsed} />
    </div>
  );
};
