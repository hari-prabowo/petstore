Copy the zip file to your machine
Unzip the file to any directory (i.e. the default would be "hprabowo-amartha" given the file name hprabowo-amartha.zip)
Open a command prompt to that directory
run "npm install"
run "npm run test"

mkdir playwright-api-demo
cd playwright-api-demo
npm init -y
npm install -D @playwright/test
npm install -D dotenv
npm install -D cross-env
npx playwright install

npx playwright test