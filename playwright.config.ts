import { defineConfig } from '@playwright/test';

const SERVER_PORT: number = 4322;
const SERVER_COMMAND: string = `bun run preview --port ${SERVER_PORT}`;
const BASE_URL: string = `http://localhost:${SERVER_PORT}`;
const SERVER_TIMEOUT_MS: number = 120 * 1000;
const VIEWPORT_WIDTH: number = 1920;
const VIEWPORT_HEIGHT: number = 1200;

export default defineConfig({
  webServer: {
    command: SERVER_COMMAND,
    url: BASE_URL,
    timeout: SERVER_TIMEOUT_MS,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: BASE_URL,
    viewport: { width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT },
  },
});
