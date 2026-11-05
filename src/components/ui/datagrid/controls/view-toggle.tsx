import { GridFour, List } from 'phosphor-react';
import { useTranslation } from 'react-i18next';

import IconButton from '../../buttons/icon-button';

import styles from './view-toggle.module.scss';

type ViewToggleProps = {
  value: 'list' | 'grid';
  onChange: (value: 'list' | 'grid') => void;
  className?: string;
};

const ViewToggle = ({ value, onChange, className = '' }: ViewToggleProps) => {
  const { t } = useTranslation();

  return (
    <div className={className ? `${styles.toggle} ${className}` : styles.toggle}>
      <IconButton
        variant="toggle"
        active={value === 'list'}
        icon={<List size={16} />}
        onClick={() => onChange('list')}
        title={t('components.viewToggle.listView')}
      />
      <IconButton
        variant="toggle"
        active={value === 'grid'}
        icon={<GridFour size={16} />}
        onClick={() => onChange('grid')}
        title={t('components.viewToggle.gridView')}
      />
    </div>
  );
};

export type { ViewToggleProps };
export default ViewToggle;
