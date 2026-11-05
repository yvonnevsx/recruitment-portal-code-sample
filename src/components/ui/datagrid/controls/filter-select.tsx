import styles from './filter-select.module.scss';

type FilterOption = {
  label: string;
  value: string;
};

type FilterSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  className?: string;
};

const FilterSelect = ({ label, value, onChange, options, className = '' }: FilterSelectProps) => {
  return (
    <select
      className={className ? `${styles.select} ${className}` : styles.select}
      value={value}
      aria-label={label}
      onChange={(event) => onChange(event.target.value)}
    >
      {options.map((option) => (
        <option
          key={`${option.label}-${option.value}`}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export type { FilterOption, FilterSelectProps };
export default FilterSelect;
