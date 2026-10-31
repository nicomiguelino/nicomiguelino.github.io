import { join } from 'path';
import { test, type Page } from '@playwright/test';
import { DEFAULT_SEASON, type Season } from '../seasons';

type ColorScheme = 'light' | 'dark';

const COLOR_SCHEMES: ColorScheme[] = ['light', 'dark'];
const SCREENSHOTS_DIRECTORY: string = 'screenshots';

interface ScreenshotOptions {
  keepAnimations?: boolean;
}

async function freezeParticleAnimations(page: Page): Promise<void> {
  await page.evaluate(async (): Promise<void> => {
    const isParticleAnimation = (animation: Animation): boolean => {
      const target: Element | null | undefined = (animation.effect as KeyframeEffect | null)?.target;
      return target?.classList.contains('particle') ?? false;
    };
    const animations: Animation[] = document.getAnimations();
    const settlingAnimations: Animation[] = animations.filter(
      (animation: Animation) => !isParticleAnimation(animation),
    );
    await Promise.all(settlingAnimations.map((animation: Animation) => animation.finished.catch(() => undefined)));
    animations.filter(isParticleAnimation).forEach((animation: Animation): void => {
      const particle = (animation.effect as KeyframeEffect).target as HTMLElement;
      animation.pause();
      animation.currentTime = 0;
      const { transform, opacity } = getComputedStyle(particle);
      animation.cancel();
      particle.style.transform = transform;
      particle.style.opacity = opacity;
    });
    const waitForFrame = (): Promise<void> => new Promise((resolve) => requestAnimationFrame(() => resolve()));
    await waitForFrame();
    await waitForFrame();
  });
}

export function defineScreenshotTests(
  pageName: string,
  path: string,
  seasons: Season[] = [DEFAULT_SEASON],
  options: ScreenshotOptions = {},
): void {
  for (const season of seasons) {
    for (const colorScheme of COLOR_SCHEMES) {
      test(`${pageName} page captures the ${season.name} ${colorScheme} screenshot`, async ({ page }) => {
        const outputPath: string = join(SCREENSHOTS_DIRECTORY, `${pageName}-${season.name}-${colorScheme}.png`);
        await page.clock.setFixedTime(new Date(season.date));
        await page.emulateMedia({ colorScheme });
        await page.goto(path);
        if (options.keepAnimations) {
          await freezeParticleAnimations(page);
          await page.screenshot({ path: outputPath, animations: 'allow' });
        } else {
          await page.screenshot({ path: outputPath, animations: 'disabled' });
        }
      });
    }
  }
}
