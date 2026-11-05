import { MagnifyingGlass } from 'phosphor-react';

import styles from './search-bar.module.scss';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const SearchBar = ({ value, onChange, placeholder = 'Search', className = '' }: SearchBarProps) => {
  return (
    <div className={className ? `${styles.search} ${className}` : styles.search}>
      <MagnifyingGlass
        className={styles.searchIcon}
        size={16}
        aria-hidden="true"
      />
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        aria-label={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};

export type { SearchBarProps };
export default SearchBar;
