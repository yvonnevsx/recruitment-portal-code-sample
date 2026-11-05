import { formatDateTime } from '@lib/format-date';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card/card';

import { useAddNote, useApplicationNotes } from '../../api/applications.queries';

import styles from './kandidaat-detail.module.scss';

type KandidaatNotesProps = {
  applicationId: string;
};

const KandidaatNotes = ({ applicationId }: KandidaatNotesProps) => {
  const { t } = useTranslation();
  const [noteText, setNoteText] = useState('');

  const { data: notes = [], isLoading } = useApplicationNotes(applicationId);
  const addNote = useAddNote();

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    addNote.mutate(
      {
        id: applicationId,
        body: { note: noteText },
      },
      {
        onSuccess: () => {
          setNoteText('');
        },
      }
    );
  };

  return (
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle className={styles.cardTitle}>{t('features.kandidaten.detail.sections.notes')}</CardTitle>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <div className={styles.notesList}>
          {isLoading ? (
            <p>{t('features.kandidaten.detail.notes.loading')}</p>
          ) : notes.length > 0 ? (
            notes.map((note) => (
              <div
                key={note.id}
                className={styles.noteItem}
              >
                <div className={styles.noteMeta}>
                  <span className={styles.noteAuthor}>{note.user_id}</span>
                  <span className={styles.noteDate}>{formatDateTime(note.created_at)}</span>
                </div>
                <p className={styles.noteText}>{note.note}</p>
              </div>
            ))
          ) : (
            <p className={styles.emptyMessage}>{t('features.kandidaten.detail.notes.empty')}</p>
          )}
        </div>

        {/* Add note form */}
        <div className={styles.addNoteForm}>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder={t('features.kandidaten.detail.notes.placeholder')}
            aria-label={t('features.kandidaten.detail.notes.placeholder')}
            className={styles.textarea}
            rows={3}
          />
          <button
            type="button"
            onClick={handleAddNote}
            disabled={!noteText.trim() || addNote.isPending}
            className={styles.submitBtn}
          >
            {addNote.isPending
              ? t('features.kandidaten.detail.notes.saving')
              : t('features.kandidaten.detail.notes.add')}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default KandidaatNotes;
