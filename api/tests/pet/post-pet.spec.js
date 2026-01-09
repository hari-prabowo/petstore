const { test, expect } = require('@playwright/test');

const idsToCleanup = [];
const domain = 'https://petstore.swagger.io';
const api = '/v2/pet';

function getRandom12DigitNumber() {
    return Math.floor(100000000000 + Math.random() * 900000000000);
}

test.describe('POST /api/v2/pet - verify cases for adding a new pet', () => {
    test('should create a new pet Cat1 successfully with valid parameters', async ({ request }, testInfo) => {
        const petId = getRandom12DigitNumber();
        const payload = {
            id: petId,
            category: {
                id: 23,
                name: 'kitten'
            },
            name: 'Cat1',
            photoUrls: [
                'cat1-placeholder.jpg'
            ],
            tags: [
                {
                    id: 23,
                    name: 'cute'
                }
            ],
            status: 'pending'
        };

        const options = {
            data: payload,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const response = await request.post(`${domain}${api}`, options);
        const resBody = await response.json();

        await testInfo.attach('REQUEST', {
            body: {
                method: 'POST',
                url: `${domain}${api}`,
                options: options
            },
            contentType: 'application/json'
        });

        await testInfo.attach('RESPONSE BODY', {
            body: JSON.stringify(resBody, null, 2),
            contentType: 'application/json'
        });

        expect(response.status()).toBe(200);
        expect(resBody.id).toBe(petId);

        // Check GET request
        const petResponse = await request.get(`https://petstore.swagger.io/v2/pet/${petId}`);
        const petResBody = await petResponse.json();
        expect(petResponse.status()).toBe(200);
        expect(petResBody.id).toBe(petId);

        idsToCleanup.push(petId);
    });

    test('should create a new pet Cat2 successfully with valid parameters', async ({ request }, testInfo) => {
        const petId = getRandom12DigitNumber();
        const payload = {
            id: petId,
            category: {
                id: 23,
                name: 'kitten'
            },
            name: 'Cat2',
            photoUrls: [
                'cat2-placeholder.jpg'
            ],
            tags: [
                {
                    id: 23,
                    name: 'cute'
                }
            ],
            status: 'pending'
        };

        const options = {
            data: payload,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const response = await request.post('https://petstore.swagger.io/v2/pet', options);
        const resBody = await response.json();

        await testInfo.attach('REQUEST', {
            body: {
                method: 'POST',
                url: `${domain}${api}`,
                options: options
            },
            contentType: 'application/json'
        });

        await testInfo.attach('RESPONSE BODY', {
            body: JSON.stringify(resBody, null, 2),
            contentType: 'application/json'
        });

        expect(response.status()).toBe(200);
        expect(resBody.id).toBe(petId);

        // Check GET request
        const petResponse = await request.get(`https://petstore.swagger.io/v2/pet/${petId}`);
        const petResBody = await petResponse.json();
        expect(petResponse.status()).toBe(200);
        expect(petResBody.id).toBe(petId);

        idsToCleanup.push(petId);
    });

    test.afterAll(async ({ request }, testInfo) => {
        for (const id of idsToCleanup) {
            const response = await request.delete(`https://petstore.swagger.io/v2/pet/${id}`);
            expect(response.status()).toBe(200);
        };

        testInfo.attach('CLEANUP', {
            body: `SUCCESSFULLY DELETED PET IDS: ${idsToCleanup}`,
            contentType: 'text/plain'
        });
    });
});
