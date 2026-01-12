const { test, expect } = require('@playwright/test');
const  {validateSchema } = require('../../helpers/schema-validator');
const petSchema = require('./schema/pet-schema.json');
const { log } = require('../../helpers/logger');
const domain = process.env.BASE_URL;
const envName = process.env.ENV;

test.beforeAll(async () => {
    console.log(`ENV: ${envName}`);
})

test.describe('GET /v2/pet - verify getting a specific pet by id', () => {
    test('request with valid pet id should return correct schema', async ({ request }, testInfo) => {
        const testId = 5000;
        const response = await request.get(`${domain}/v2/pet/${testId}`);

        log(testInfo, 'REQUEST', `${domain}/v2/pet/${testId}`, 'text/plain');

        const resBody = await response.json();
        log(testInfo, 'RESPONSE', resBody, 'application/json');

        expect(response.status()).toBe(200);
        expect(resBody.id).toBe(testId);

        const res = await validateSchema(resBody, petSchema);
        log(testInfo, 'SCHEMA VALIDATION', res.resultItems, 'application/json');

        expect(res.result).toBe(true, {
            message: 'Expected response to match expected schema, see SCHEMA VALIDATION in report attachments'
        });
    });
});
