const { test, expect } = require('@playwright/test');
const  {validateSchema } = require('../../helpers/schema-validator');
const petSchema = require('./schema/pet-schema.json');
const domain = process.env.BASE_URL;
const envName = process.env.ENV;

test.describe('GET /v2/pet - verify getting a specific pet by id', () => {
    test('request with valid pet id should return correct schema', async ({ request }, testInfo) => {
        const testId = 5000;
        const response = await request.get(`${domain}/v2/pet/${testId}`);

        console.log(`ENV: ${envName}`);

        await testInfo.attach('REQUEST', {
            body: `${domain}/v2/pet/${testId}`,
            contentType: 'text/plain'
        });

        const resBody = await response.json();

        await testInfo.attach('RESPONSE', {
            body: JSON.stringify(resBody, null, 2),
            contentType: 'application/json'
        });

        expect(response.status()).toBe(200);
        expect(resBody.id).toBe(testId);

        const res = await validateSchema(resBody, petSchema);
        await testInfo.attach('SCHEMA VALIDATION', {
            body: JSON.stringify(res.resultItems, null, 2),
            contentType: 'application/json'
        });

        expect(res.result).toBe(true, {
            message: 'Expected response to match expected schema, see SCHEMA VALIDATION in report attachments'
        });
    });
});
