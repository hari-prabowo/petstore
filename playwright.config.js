const { defineConfig } = require('@playwright/test');
const { config } = require('dotenv');

// use .env by default, or .env.${TEST_ENV} if provided in command line
const env = process.env.TEST_ENV;
console.log(`CONFIG ENV = ${env}`);
if (env) {
  config({ path: `.env.${env}` });
} else {
  config();
}
console.log("Loaded ENV:", process.env.ENV);

// always write html report file
module.exports = defineConfig({
  reporter: [
    ['html', { open: 'never' }]
  ],
});