const { test, expect } = require('@playwright/test');
const  {validateSchema } = require('../../helpers/schema-validator');
const petSchema = require('./schema/pet-schema.json');

test.describe('GET /v2/pet - verify getting a specific pet by id', () => {
    test('existing pet id should return successful response', async ({ request }, testInfo) => {
        const testId = 36498945;
        const response = await request.get(`https://petstore.swagger.io/v2/pet/${testId}`);

        await testInfo.attach('REQUEST', {
            body: `https://petstore.swagger.io/v2/pet/${testId}`,
            contentType: 'text/plain'
        });

        const resBody = await response.json();

        await testInfo.attach('RESPONSE', {
            body: JSON.stringify(resBody, null, 2),
            contentType: 'application/json'
        });

        expect(response.status()).toBe(200);
        expect(resBody.id).toBe(testId);
        expect(validateSchema(resBody, petSchema)).toBe(true);
    });
});
