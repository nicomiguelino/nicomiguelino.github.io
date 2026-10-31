export const PALETTE_CONFIG = {
  modeStorageKey: 'site-mode',
  legacyPaletteStorageKey: 'site-palette',
  autumnSeason: { start: 922, end: 1221 },
} as const;

type PaletteMode = 'light' | 'dark';
type PaletteFamily = 'neon' | 'autumn';

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

function getPaletteFamily(): PaletteFamily {
  const today: Date = new Date();
  const monthDay: number = (today.getMonth() + 1) * 100 + today.getDate();
  const { start, end } = PALETTE_CONFIG.autumnSeason;
  return monthDay >= start && monthDay <= end ? 'autumn' : 'neon';
}

function applyPalette(): void {
  migrateLegacyPalette();
  document.documentElement.setAttribute('data-palette', `${getPaletteFamily()}-${getMode()}`);
}

export function initializePalette(): void {
  applyPalette();
  document.addEventListener('astro:after-swap', applyPalette);
}
