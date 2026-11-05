import { formatDateTime } from '@lib/format-date';
import getInitials from '@lib/get-initials';
import { useTranslation } from 'react-i18next';

import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card/card';

import { useApplication, useApplicationStatuses, useUpdateApplicationStatus } from '../../api/applications.queries';
import KandidaatNotes from './kandidaat-notes';

import styles from './kandidaat-detail.module.scss';

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

type KandidaatDetailProps = {
  id: string;
};

const KandidaatDetail = ({ id }: KandidaatDetailProps) => {
  const { t } = useTranslation();

  const { data: application, isLoading, isError } = useApplication(id);
  const { data: statuses = [] } = useApplicationStatuses();

  const updateStatus = useUpdateApplicationStatus();

  if (isLoading) {
    return <div className={styles.page}>{t('features.kandidaten.detail.loading')}</div>;
  }

  if (isError) {
    return (
      <div
        className={styles.page}
        role="alert"
      >
        {t('features.kandidaten.detail.error')}
      </div>
    );
  }

  if (!application) {
    return <div className={styles.page}>{t('features.kandidaten.detail.notFound')}</div>;
  }

  const handleStatusChange = (statusId: string) => {
    updateStatus.mutate({
      id: application.id,
      body: { status_id: statusId },
    });
  };

  const { applicant, vacancy, status } = application;
  const fullName = applicant ? `${applicant.first_name} ${applicant.last_name}` : undefined;
  const statusSelectId = 'kandidaat-status';

  return (
    <div className={styles.page}>
      {/* Header */}
      <section className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.avatar}>{fullName ? getInitials(fullName) : '?'}</div>
          <div className={styles.headerInfo}>
            <h1 className={styles.name}>{fullName ?? '-'}</h1>
            <p className={styles.vacancy}>{vacancy?.title ?? '-'}</p>
          </div>
          {status && <span className={`${styles.statusBadge} ${getStatusClass(status.name)}`}>{status.name}</span>}
        </div>
      </section>

      {/* Main content grid */}
      <section className={styles.content}>
        {/* Left column */}
        <div className={styles.column}>
          {/* Algemene info */}
          <Card className={styles.card}>
            <CardHeader>
              <CardTitle className={styles.cardTitle}>{t('features.kandidaten.detail.sections.generalInfo')}</CardTitle>
            </CardHeader>
            <CardContent className={styles.cardContent}>
              <div className={styles.infoGrid}>
                <div className={styles.infoField}>
                  <span className={styles.fieldLabel}>{t('features.kandidaten.detail.fields.email')}</span>
                  <p>{applicant?.email ?? '-'}</p>
                </div>
                <div className={styles.infoField}>
                  <span className={styles.fieldLabel}>{t('features.kandidaten.detail.fields.phone')}</span>
                  <p>{applicant?.phone ?? '-'}</p>
                </div>
                <div className={styles.infoField}>
                  <span className={styles.fieldLabel}>{t('features.kandidaten.detail.fields.linkedin')}</span>
                  {applicant?.linkedin_url ? (
                    <a
                      href={applicant.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      {t('features.kandidaten.detail.fields.linkedinProfile')}
                    </a>
                  ) : (
                    <p>-</p>
                  )}
                </div>
                <div className={styles.infoField}>
                  <span className={styles.fieldLabel}>{t('features.kandidaten.detail.fields.appliedAt')}</span>
                  <p>{formatDateTime(application.applied_at)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status & Proces */}
          <Card className={styles.card}>
            <CardHeader>
              <CardTitle className={styles.cardTitle}>
                {t('features.kandidaten.detail.sections.statusAndProcess')}
              </CardTitle>
            </CardHeader>
            <CardContent className={styles.cardContent}>
              <div className={styles.infoGrid}>
                <div className={styles.infoField}>
                  <label htmlFor={statusSelectId}>{t('features.kandidaten.detail.fields.status')}</label>
                  <select
                    id={statusSelectId}
                    value={status?.id ?? ''}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    disabled={updateStatus.isPending}
                    className={styles.select}
                  >
                    {statuses.map((s) => (
                      <option
                        key={s.id}
                        value={s.id}
                      >
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.infoField}>
                  <span className={styles.fieldLabel}>{t('features.kandidaten.detail.fields.assignedTo')}</span>
                  <p>{application.assigned_user?.name ?? t('features.kandidaten.detail.fields.notAssigned')}</p>
                </div>
                <div className={styles.infoField}>
                  <span className={styles.fieldLabel}>{t('features.kandidaten.detail.fields.lastModified')}</span>
                  <p>{formatDateTime(application.updated_at)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className={styles.column}>
          <KandidaatNotes applicationId={application.id} />
        </div>
      </section>
    </div>
  );
};

export default KandidaatDetail;
