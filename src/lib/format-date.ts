const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

const DATE_TIME_OPTIONS: Intl.DateTimeFormatOptions = {
  ...DATE_OPTIONS,
  hour: '2-digit',
  minute: '2-digit',
};

/**
 * Formats an ISO date string as a Dutch date, e.g. "20 maart 2026".
 */
export const formatDate = (isoString: string): string => new Date(isoString).toLocaleDateString('nl-NL', DATE_OPTIONS);

/**
 * Formats an ISO date string as a Dutch date including time, e.g. "20 maart 2026 om 11:00".
 */
export const formatDateTime = (isoString: string): string =>
  new Date(isoString).toLocaleDateString('nl-NL', DATE_TIME_OPTIONS);
