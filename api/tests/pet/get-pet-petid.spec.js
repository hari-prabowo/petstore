const { test, expect } = require('@playwright/test');

test.describe('GET /v2/pet - verify getting a specific pet by id', () => {
    test('existing pet id should return successful response', async ({ request }, testInfo) => {
        const response = await request.get('https://petstore.swagger.io/v2/pet/177949');
        expect(response.status()).toBe(200);

        const resBody = await response.json();

        await testInfo.attach('REQUEST', {
            body: 'https://petstore.swagger.io/v2/pet/177949',
            contentType: 'text/plain'
        });

        await testInfo.attach('RESPONSE', {
            body: JSON.stringify(resBody, null, 2),
            contentType: 'application/json'
        });
        expect(resBody.id).toBe(177949);

    });
});
