const { test, expect } = require('@playwright/test');

test.describe.skip('GET /api/v2/pet/findByStatus - verify getting list of pets by status', () => {
    test('should only return pets with the status=available', async ({ request }, testInfo) => {
        const response = await request.get('https://petstore.swagger.io/v2/pet/findByStatus?status=available');
        expect(response.status()).toBe(200);

        const resBody = await response.json();

        await testInfo.attach('REQUEST', {
            body: 'https://petstore.swagger.io/v2/pet/findByStatus?status=available',
            contentType: 'text/plain'
        });

        await testInfo.attach('RESPONSE', {
            body: JSON.stringify(resBody, null, 2),
            contentType: 'application/json'
        });

        let isAllPetsAvailable = true;
        for (const pet of resBody) {
            if (pet.status !== 'available') {
                isAllPetsAvailable = false;
                break;
            }
        }

        expect(isAllPetsAvailable).toBe(true);
    });

    test('should only return pets with the status=pending', async ({ request }, testInfo) => {
        const response = await request.get('https://petstore.swagger.io/v2/pet/findByStatus?status=pending');
        expect(response.status()).toBe(200);

        const resBody = await response.json();

        await testInfo.attach('REQUEST', {
            body: 'https://petstore.swagger.io/v2/pet/findByStatus?status=pending',
            contentType: 'text/plain'
        });

        await testInfo.attach('RESPONSE', {
            body: JSON.stringify(resBody, null, 2),
            contentType: 'application/json'
        });

        let isAllPetsAvailable = true;
        for (const pet of resBody) {
            if (pet.status !== 'pending') {
                isAllPetsAvailable = false;
                break;
            }
        }

        expect(isAllPetsAvailable).toBe(true);
    });
});
