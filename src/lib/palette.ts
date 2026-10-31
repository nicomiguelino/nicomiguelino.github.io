export const PALETTE_CONFIG = {
  modeStorageKey: 'site-mode',
  legacyPaletteStorageKey: 'site-palette',
  seasons: {
    autumn: { start: 922, end: 1221 },
    winter: { start: 1222, end: 319 },
  },
} as const;

type PaletteMode = 'light' | 'dark';
type PaletteFamily = 'neon' | 'autumn' | 'winter';
type SeasonRange = { start: number; end: number };

function migrateLegacyPalette(): void {
  const legacyPalette: string | null = localStorage.getItem(PALETTE_CONFIG.legacyPaletteStorageKey);
  if (legacyPalette === null) return;
  localStorage.removeItem(PALETTE_CONFIG.legacyPaletteStorageKey);
  const legacyMode: string = legacyPalette.split('-').pop() ?? '';
  const hasStoredMode: boolean = localStorage.getItem(PALETTE_CONFIG.modeStorageKey) !== null;
  if ((legacyMode === 'light' || legacyMode === 'dark') && !hasStoredMode) {
    localStorage.setItem(PALETTE_CONFIG.modeStorageKey, legacyMode);
  }
}

function getMode(): PaletteMode {
  const storedMode: string | null = localStorage.getItem(PALETTE_CONFIG.modeStorageKey);
  if (storedMode === 'light' || storedMode === 'dark') return storedMode;
  if (storedMode !== null) localStorage.removeItem(PALETTE_CONFIG.modeStorageKey);
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function isInSeason(monthDay: number, season: SeasonRange): boolean {
  const wrapsYear: boolean = season.start > season.end;
  return wrapsYear
    ? monthDay >= season.start || monthDay <= season.end
    : monthDay >= season.start && monthDay <= season.end;
}

function getPaletteFamily(): PaletteFamily {
  const today: Date = new Date();
  const monthDay: number = (today.getMonth() + 1) * 100 + today.getDate();
  const seasonNames = Object.keys(PALETTE_CONFIG.seasons) as (keyof typeof PALETTE_CONFIG.seasons)[];
  const activeSeason = seasonNames.find((seasonName) => isInSeason(monthDay, PALETTE_CONFIG.seasons[seasonName]));
  return activeSeason ?? 'neon';
}

function applyPalette(): void {
  migrateLegacyPalette();
  document.documentElement.setAttribute('data-palette', `${getPaletteFamily()}-${getMode()}`);
}

export function initializePalette(): void {
  applyPalette();
  document.addEventListener('astro:after-swap', applyPalette);
}
