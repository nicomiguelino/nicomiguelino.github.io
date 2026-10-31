import { AUTUMN_SEASON, DEFAULT_SEASON, SPRING_SEASON, WINTER_SEASON } from '../seasons';
import { defineScreenshotTests } from './support';

defineScreenshotTests('falling-particles', '/', [DEFAULT_SEASON, AUTUMN_SEASON, WINTER_SEASON, SPRING_SEASON], {
  keepAnimations: true,
});
