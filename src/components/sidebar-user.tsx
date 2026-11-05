import getInitials from '@lib/get-initials';
import { SignOut } from 'phosphor-react';
import { useTranslation } from 'react-i18next';

import { useAuth, useLogout } from '@features/auth/api/auth.mutations';

import IconButton from './ui/buttons/icon-button';

import styles from './sidebar.module.scss';

type SidebarUserProps = {
  isCollapsed: boolean;
};

const SidebarUser = ({ isCollapsed }: SidebarUserProps) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const logout = useLogout();

  const initials = user?.displayName ? getInitials(user.displayName) : '?';

  return (
    <div className={styles.userInfo}>
      {isCollapsed ? (
        <div className={styles.userAvatar}>
          <span>{initials}</span>
          <div className={styles.tooltip}>
            <p>{user?.displayName}</p>
            <p>{user?.roles.join(', ')}</p>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.userNameRow}>
            <p className={styles.userName}>{user?.displayName}</p>
            <IconButton
              variant="ghost"
              icon={<SignOut size={20} />}
              onClick={() => logout.mutate()}
              disabled={logout.isPending}
              title={t('components.sidebar.logout')}
              className={styles.logoutBtn}
            />
          </div>
          <p className={styles.userRole}>{user?.roles.join(', ')}</p>
        </>
      )}
    </div>
  );
};

export default SidebarUser;
