import { expect, type Page } from '@playwright/test';
import { defineScreenshotTests } from './support';

const RELEASES_URL_PATTERN: RegExp = /^https:\/\/api\.github\.com\/repos\/([^/]+\/[^/]+)\/releases\/latest$/;
const FIXTURE_TAG_NAME: string = 'v1.0.0';
const RELEASE_BADGE_SELECTOR: string = '[data-release-repository]';
const VISIBLE_RELEASE_BADGE_SELECTOR: string = `${RELEASE_BADGE_SELECTOR}:not([hidden])`;

async function mockLatestReleases(page: Page): Promise<void> {
  await page.route(RELEASES_URL_PATTERN, async (route): Promise<void> => {
    await route.fulfill({ json: { tag_name: FIXTURE_TAG_NAME } });
  });
}

async function waitForReleaseBadges(page: Page): Promise<void> {
  const totalBadgeCount: number = await page.locator(RELEASE_BADGE_SELECTOR).count();
  await expect(page.locator(VISIBLE_RELEASE_BADGE_SELECTOR)).toHaveCount(totalBadgeCount);
}

defineScreenshotTests('projects', '/projects/', undefined, {
  beforeNavigation: mockLatestReleases,
  afterNavigation: waitForReleaseBadges,
});
