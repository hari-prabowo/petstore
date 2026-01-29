import { defineConfig } from '@playwright/test';
import { config } from 'dotenv';

// use .env by default, or .env.${TEST_ENV} if provided in command line
const env = process.env.TEST_ENV;
if (env) {
  config({ path: `.env.${env}` });
} else {
  config();
}

// always write html report file
export default defineConfig({
  reporter: [
    ['html', { open: 'never' }]
  ],
  workers: process.env.CI ? 1 : 3,
  fullyParallel: false,
});