import type { ReactNode } from 'react';

import styles from './icon-button.module.scss';

type IconButtonProps = {
  icon: ReactNode;
  onClick?: () => void;
  title?: string;
  variant?: 'ghost' | 'round' | 'toggle';
  active?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

const IconButton = ({
  icon,
  onClick = undefined,
  title = undefined,
  variant = 'ghost',
  active = false,
  disabled = false,
  type = 'button',
  className = '',
}: IconButtonProps) => {
  const cls = [
    styles.iconBtn,
    styles[`iconBtn--${variant}`],
    active ? styles[`iconBtn--${variant}--active`] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={cls}
      onClick={onClick}
      title={title}
      disabled={disabled}
      aria-label={title}
    >
      {icon}
    </button>
  );
};

export type { IconButtonProps };
export default IconButton;
