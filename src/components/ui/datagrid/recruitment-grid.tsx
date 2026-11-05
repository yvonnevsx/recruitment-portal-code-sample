import getInitials from '@lib/get-initials';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { GridColumn as Column, Grid, GridCustomCellProps } from '@progress/kendo-react-grid';

import { type Candidate, KanbanBoard } from '@features/kandidaten/components/kandidaten/kanban/kanban';

import FilterSelect from './controls/filter-select';
import SearchBar from './controls/search-bar';
import ViewToggle from './controls/view-toggle';

import styles from './recruitment-grid.module.scss';

export type RecruitmentRow = {
  id: string;
  name: string;
  vacancy: string;
  status: string;
  assignee: string;
  date: string;
};

type RecruitmentGridProps = {
  data?: RecruitmentRow[];
  height?: number | string;
  isLoading?: boolean;
  statuses?: string[];
  onRowClick?: (row: RecruitmentRow) => void;
  onStatusChange?: (id: string, newStatus: string) => void;
};

const getStatusClass = (status: string): string => {
  switch (status) {
    case 'Nieuw':
      return styles.statusNew;
    case 'Doorgestuurd':
      return styles.statusForwarded;
    case 'Eerste gesprek':
    case 'Tweede gesprek':
      return styles.statusInProgress;
    case 'Aanbieding':
      return styles.statusOffer;
    case 'Aangenomen':
      return styles.statusAccepted;
    case 'Afgewezen':
      return styles.statusRejected;
    default:
      return '';
  }
};

const NameCell = (props: GridCustomCellProps) => {
  const dataItem = props.dataItem as RecruitmentRow;
  const tdProps = props.tdProps ?? {};

  return (
    <td {...tdProps}>
      <div className={styles.nameCell}>
        <div className={styles.avatar}>{getInitials(dataItem.name)}</div>
        <span className={styles.nameText}>{dataItem.name}</span>
      </div>
    </td>
  );
};

const StatusCell = (props: GridCustomCellProps) => {
  const dataItem = props.dataItem as RecruitmentRow;
  const tdProps = props.tdProps ?? {};
  const className = [tdProps.className, styles.statusCell].filter(Boolean).join(' ');

  return (
    <td
      {...tdProps}
      className={className}
    >
      <span className={`${styles.statusBadge} ${getStatusClass(dataItem.status)}`}>{dataItem.status}</span>
    </td>
  );
};

const RecruitmentGrid = ({
  data = [],
  height = 540,
  isLoading = false,
  statuses = undefined,
  onRowClick = () => undefined,
  onStatusChange = undefined,
}: RecruitmentGridProps) => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [vacancyValue, setVacancyValue] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const vacancyOptions = useMemo(() => Array.from(new Set(data.map((item) => item.vacancy))).sort(), [data]);

  const statusOptions = useMemo(() => Array.from(new Set(data.map((item) => item.status))).sort(), [data]);

  const filteredData = useMemo(() => {
    const search = searchValue.trim().toLowerCase();

    return data.filter((item) => {
      const matchesSearch = search
        ? item.name.toLowerCase().includes(search) || item.vacancy.toLowerCase().includes(search)
        : true;
      const matchesStatus = statusValue ? item.status === statusValue : true;
      const matchesVacancy = vacancyValue ? item.vacancy === vacancyValue : true;

      return matchesSearch && matchesStatus && matchesVacancy;
    });
  }, [data, searchValue, statusValue, vacancyValue]);

  const kanbanCandidates: Candidate[] = useMemo(
    () =>
      filteredData.map((item) => ({
        id: item.id,
        name: item.name,
        initials: getInitials(item.name),
        position: item.vacancy,
        assignedTo: item.assignee !== '-' ? item.assignee : undefined,
        appliedDate: item.date,
        status: item.status,
      })),
    [filteredData]
  );

  if (isLoading) {
    return <div className={styles.wrapper}>{t('components.recruitmentGrid.loading')}</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <SearchBar
          value={searchValue}
          placeholder={t('components.recruitmentGrid.search')}
          onChange={setSearchValue}
        />
        <div className={styles.filters}>
          <FilterSelect
            label={t('components.recruitmentGrid.filterStatusLabel')}
            value={statusValue}
            onChange={setStatusValue}
            options={[
              { label: t('components.recruitmentGrid.filterAllStatuses'), value: '' },
              ...statusOptions.map((s) => ({ label: s, value: s })),
            ]}
          />
          <FilterSelect
            label={t('components.recruitmentGrid.filterVacancyLabel')}
            value={vacancyValue}
            onChange={setVacancyValue}
            options={[
              { label: t('components.recruitmentGrid.filterAllVacancies'), value: '' },
              ...vacancyOptions.map((v) => ({ label: v, value: v })),
            ]}
          />
        </div>
        <ViewToggle
          value={viewMode}
          onChange={setViewMode}
        />
      </div>
      {viewMode === 'grid' ? (
        <KanbanBoard
          candidates={kanbanCandidates}
          statuses={statuses}
          onStatusChange={onStatusChange}
        />
      ) : (
        <Grid
          className={styles.grid}
          style={height ? { height } : undefined}
          dataItemKey="id"
          data={filteredData}
          autoProcessData
          sortable
          pageable={{ pageSizes: [5, 10, 20] }}
          defaultTake={10}
          defaultSkip={0}
          onRowClick={(e) => onRowClick(e.dataItem)}
        >
          <Column
            field="name"
            title={t('components.recruitmentGrid.columns.name')}
            cells={{ data: NameCell }}
          />
          <Column
            field="vacancy"
            title={t('components.recruitmentGrid.columns.vacancy')}
          />
          <Column
            field="status"
            title={t('components.recruitmentGrid.columns.status')}
            cells={{ data: StatusCell }}
          />
          <Column
            field="assignee"
            title={t('components.recruitmentGrid.columns.assignedTo')}
          />
          <Column
            field="date"
            title={t('components.recruitmentGrid.columns.date')}
          />
        </Grid>
      )}
    </div>
  );
};

export type { RecruitmentGridProps };
export default RecruitmentGrid;
