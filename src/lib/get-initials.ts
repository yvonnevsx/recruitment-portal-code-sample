/**
 * Returns up to 2 uppercase initials from a full name string.
 * Single-word names return just the first letter.
 */
const getInitials = (name: string): string => {
  const parts = name.trim().split(' ');
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '';
  return `${first}${last}`.toUpperCase();
};

export default getInitials;
