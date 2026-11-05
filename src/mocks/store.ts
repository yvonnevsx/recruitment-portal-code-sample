/**
 * Centralised in-memory store for MSW mock state.
 *
 * All mutable arrays live here so every handler reads the same data.
 * State is seeded from sessionStorage on page load and written back
 * after every mutation, so changes survive page refreshes within the
 * same browser tab.
 */
import { applicationNotesData, applicationsData } from './data/applications.data';
import { talentPoolMembersData } from './data/talent-pools.data';

type StoreKey = 'msw_applications' | 'msw_notes' | 'msw_members';

function load<T>(key: StoreKey, fallback: T[]): T[] {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [...fallback];
  } catch {
    return [...fallback];
  }
}

export function persist(key: StoreKey, data: unknown[]): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch {
    // sessionStorage unavailable (e.g. private browsing with strict settings)
  }
}

export const store = {
  applications: load('msw_applications', applicationsData),
  notes: load('msw_notes', applicationNotesData),
  members: load('msw_members', talentPoolMembersData),
};
