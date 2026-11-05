import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  // Views such as skills-map are compiled lazily by the Vite dev server; a cold transform
  // can outlive 30s when several Chromium workers compete for a small machine.
  timeout: 90000,
  expect: {
    timeout: 15000,
  },
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  // Chromium + dev server together need most of the RAM on a 4-core laptop; extra workers
  // only make the runs slower and crash ("worker process exited unexpectedly").
  workers: process.env.CI ? 2 : 1,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'off',
  },
  webServer: {
    // `npm run test:e2e` builds first, so the suite always exercises the production bundle and
    // editing a source file mid-run can no longer invalidate modules under a running test.
    command: 'npm run preview -- --port 3000 --strictPort',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
