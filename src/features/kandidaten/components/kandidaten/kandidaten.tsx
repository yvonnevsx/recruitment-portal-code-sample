import { formatDate } from '@lib/format-date';
import { useNavigate } from 'react-router';

import RecruitmentGrid, { type RecruitmentRow } from '@components/ui/datagrid/recruitment-grid';

import { useAllApplications, useApplicationStatuses, useUpdateApplicationStatus } from '../../api/applications.queries';

import styles from './kandidaten.module.scss';

const Kandidaten = () => {
  const navigate = useNavigate();
  // Grid filters client-side, so fetch the full set
  const { data: applications = [], isLoading } = useAllApplications();
  const { data: statuses = [] } = useApplicationStatuses();
  const updateStatus = useUpdateApplicationStatus();

  const rows: RecruitmentRow[] = applications.map((application) => ({
    id: application.id,
    name: application.applicant ? `${application.applicant.first_name} ${application.applicant.last_name}` : '-',
    vacancy: application.vacancy?.title ?? '-',
    status: application.status?.name ?? '-',
    assignee: application.assigned_user?.name ?? '-',
    date: formatDate(application.applied_at),
  }));

  const handleRowClick = (row: RecruitmentRow) => {
    navigate(`/kandidaten/${row.id}`);
  };

  // Kanban uses status names, API expects a status_id
  const handleStatusChange = (applicationId: string, newStatus: string) => {
    const status = statuses.find((s) => s.name === newStatus);
    if (!status) return;
    updateStatus.mutate({ id: applicationId, body: { status_id: status.id } });
  };

  return (
    <div className={styles.page}>
      <RecruitmentGrid
        data={rows}
        isLoading={isLoading}
        statuses={statuses.map((s) => s.name)}
        onRowClick={handleRowClick}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default Kandidaten;
