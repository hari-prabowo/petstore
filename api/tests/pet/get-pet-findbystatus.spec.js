const { test, expect } = require('@playwright/test');
const domain = process.env.BASE_URL;
const envName = process.env.ENV;

test.describe('GET /v2/pet/findByStatus - verify getting list of pets by status', () => {
    test('should only return pets with the status=available', async ({ request }, testInfo) => {

        console.log(`ENV: ${envName}`);
        
        const url = `${domain}/v2/pet/findByStatus?status=available`;
        const response = await request.get(url);
        expect(response.status()).toBe(200);

        const resBody = await response.json();
        await testInfo.attach('REQUEST', {
            body: url,
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
        const url = `${domain}/v2/pet/findByStatus?status=pending`;
        const response = await request.get(url);
        expect(response.status()).toBe(200);

        const resBody = await response.json();

        await testInfo.attach('REQUEST', {
            body: url,
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
