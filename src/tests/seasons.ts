export interface Season {
  name: string;
  date: string;
}

export const DEFAULT_SEASON: Season = { name: 'default', date: '2026-06-15T12:00:00' };
export const AUTUMN_SEASON: Season = { name: 'autumn', date: '2026-10-15T12:00:00' };
export const WINTER_SEASON: Season = { name: 'winter', date: '2026-01-15T12:00:00' };
