mkdir playwright-api-demo
cd playwright-api-demo
npm init -y
npm install -D @playwright/test
npm install -D dotenv
npm install -D cross-env
npx playwright install

npx playwright test