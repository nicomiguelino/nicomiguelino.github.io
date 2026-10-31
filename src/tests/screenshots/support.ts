import { test, expect } from '@playwright/test';

type ColorScheme = 'light' | 'dark';

interface Season {
  name: string;
  date: string;
}

const COLOR_SCHEMES: ColorScheme[] = ['light', 'dark'];

export const DEFAULT_SEASON: Season = { name: 'default', date: '2026-06-15T12:00:00' };
export const AUTUMN_SEASON: Season = { name: 'autumn', date: '2026-10-15T12:00:00' };

export function defineScreenshotTests(pageName: string, path: string, seasons: Season[] = [DEFAULT_SEASON]): void {
  for (const season of seasons) {
    for (const colorScheme of COLOR_SCHEMES) {
      test(`${pageName} page matches the ${season.name} ${colorScheme} screenshot`, async ({ page }) => {
        await page.clock.setFixedTime(new Date(season.date));
        await page.emulateMedia({ colorScheme });
        await page.goto(path);
        await expect(page).toHaveScreenshot(`${pageName}-${season.name}-${colorScheme}.png`);
      });
    }
  }
}
