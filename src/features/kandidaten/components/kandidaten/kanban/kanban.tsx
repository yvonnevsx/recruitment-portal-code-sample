import { DotsSixVertical } from 'phosphor-react';
import { useEffect, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import styles from './kanban.module.scss';

export type CandidateStatus = string;

export type Candidate = {
  id: string;
  name: string;
  initials: string;
  position: string;
  assignedTo?: string;
  appliedDate: string;
  status: CandidateStatus;
};

const ItemTypes = {
  CANDIDATE: 'candidate',
};

const columnStyleByStatus: Record<string, string> = {
  Nieuw: styles['kanban-column__inner--nieuw'],
  Doorgestuurd: styles['kanban-column__inner--doorgestuurd'],
  'Eerste gesprek': styles['kanban-column__inner--eerste-gesprek'],
  'Tweede gesprek': styles['kanban-column__inner--tweede-gesprek'],
  Aanbieding: styles['kanban-column__inner--aanbieding'],
  Afgewezen: styles['kanban-column__inner--afgewezen'],
  Aangenomen: styles['kanban-column__inner--aangenomen'],
};

const getColumnClass = (status: CandidateStatus) => columnStyleByStatus[status] ?? '';

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard = ({ candidate }: CandidateCardProps) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: ItemTypes.CANDIDATE,
      item: { id: candidate.id, currentStatus: candidate.status, name: candidate.name },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [candidate.id, candidate.status, candidate.name]
  );

  const previewRef = useRef<HTMLDivElement | null>(null);
  const dragHandleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dragPreview(previewRef);
  }, [dragPreview]);

  useEffect(() => {
    drag(dragHandleRef);
  }, [drag]);

  return (
    <div
      ref={previewRef}
      className={[styles['candidate-card'], isDragging ? styles['candidate-card--dragging'] : '']
        .filter(Boolean)
        .join(' ')}
    >
      <div className={styles['candidate-card__wrapper']}>
        {/* Drag Handle */}
        <div
          ref={dragHandleRef}
          className={styles['candidate-card__drag-handle']}
        >
          <DotsSixVertical className={styles.icon} />
        </div>

        {/* Card Content */}
        <div className={styles['candidate-card__content']}>
          <Link
            to={`/kandidaten/${candidate.id}`}
            className={styles['candidate-card__link']}
          >
            <div className={styles['candidate-card__header']}>
              <div className={styles['candidate-card__avatar']}>
                <span className={styles['candidate-card__initials']}>{candidate.initials}</span>
              </div>
              <div className={styles['candidate-card__info']}>
                <h3 className={styles['candidate-card__name']}>{candidate.name}</h3>
                <p className={styles['candidate-card__position']}>{candidate.position}</p>
              </div>
            </div>

            <div className={styles['candidate-card__details']}>
              {candidate.assignedTo && (
                <div className={styles['candidate-card__detail-row']}>
                  <span
                    className={styles.emoji}
                    aria-hidden="true"
                  >
                    👤
                  </span>
                  <span>{candidate.assignedTo}</span>
                </div>
              )}
              <div className={styles['candidate-card__detail-row']}>
                <span
                  className={styles.emoji}
                  aria-hidden="true"
                >
                  📅
                </span>
                <span>{candidate.appliedDate}</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

interface KanbanColumnProps {
  status: CandidateStatus;
  candidates: Candidate[];
  onDrop?: (candidateId: string, newStatus: CandidateStatus) => void;
}

const KanbanColumn = ({ status, candidates, onDrop = undefined }: KanbanColumnProps) => {
  const { t } = useTranslation();
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CANDIDATE,
      canDrop: () => !!onDrop,
      drop: (item: { id: string; currentStatus: CandidateStatus }) => {
        if (!onDrop) return;
        if (item.currentStatus !== status) {
          onDrop(item.id, status);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [status, onDrop]
  );

  const dropRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    drop(dropRef);
  }, [drop]);

  return (
    <div
      ref={dropRef}
      className={styles['kanban-column']}
    >
      <div
        className={[
          styles['kanban-column__inner'],
          getColumnClass(status),
          isOver ? styles['kanban-column__inner--drag-over'] : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className={styles['kanban-column__header']}>
          <h2 className={styles['kanban-column__title']}>{status}</h2>
          <span className={styles['kanban-column__count']}>{candidates.length}</span>
        </div>

        <div className={styles['kanban-column__cards']}>
          {candidates.length === 0 ? (
            <p className={styles['kanban-column__empty']}>{t('features.kandidaten.kanban.noCandidates')}</p>
          ) : (
            candidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

interface KanbanBoardProps {
  candidates: Candidate[];
  onStatusChange?: (candidateId: string, newStatus: CandidateStatus) => void;
  statuses?: CandidateStatus[];
}

export const KanbanBoard = ({
  candidates,
  onStatusChange = undefined,
  statuses = undefined,
}: KanbanBoardProps) => {
  const statusList = statuses ?? Array.from(new Set(candidates.map((candidate) => candidate.status)));

  // Group candidates by status
  const candidatesByStatus = statusList.reduce(
    (acc, status) => {
      acc[status] = candidates.filter((candidate) => candidate.status === status);
      return acc;
    },
    {} as Record<CandidateStatus, Candidate[]>
  );

  return (
    <div className={styles['kanban-board']}>
      <DndProvider backend={HTML5Backend}>
        <div className={styles['kanban-board__columns']}>
          {statusList.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              candidates={candidatesByStatus[status]}
              onDrop={onStatusChange}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
};
