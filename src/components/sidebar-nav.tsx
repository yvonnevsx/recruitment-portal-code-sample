import { Users } from 'phosphor-react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';

import styles from './sidebar.module.scss';

type SidebarNavProps = {
  isCollapsed: boolean;
};

const SidebarNav = ({ isCollapsed }: SidebarNavProps) => {
  const { t } = useTranslation();

  const menuItems = [{ name: t('features.pages.candidates'), path: '/kandidaten', icon: Users }];

  return (
    <nav className={styles.nav}>
      {menuItems.map(({ name, path, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles['navLink--active'] : ''}`}
        >
          <Icon className={styles.navIcon} />
          <span className={styles.navLabel}>{name}</span>
          {isCollapsed && <span className={styles.tooltip}>{name}</span>}
        </NavLink>
      ))}
    </nav>
  );
};

export default SidebarNav;
