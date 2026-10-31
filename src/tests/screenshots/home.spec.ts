import { AUTUMN_SEASON, DEFAULT_SEASON, WINTER_SEASON } from '../seasons';
import { defineScreenshotTests } from './support';

defineScreenshotTests('home', '/', [DEFAULT_SEASON, AUTUMN_SEASON, WINTER_SEASON]);
