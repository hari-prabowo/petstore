const { test, expect } = require('@playwright/test');
const { log } = require('../../helpers/logger');

const idsToCleanup = [];
const domain = process.env.BASE_URL;
const envName = process.env.ENV;
const api = '/v2/pet';

function getRandom12DigitNumber() {
    return Math.floor(100000000000 + Math.random() * 900000000000);
}

test.beforeAll(async() => {
    console.log(`ENV: ${envName}`);
});

test.describe('POST /api/v2/pet - verify valid cases for adding a new pet', () => {

    const testCasesValid = ['Cat1', 'Cat2'];

    for (const testCase of testCasesValid) {
        test(`should create a new pet ${testCase} successfully with valid parameters`, async ({ request }, testInfo) => {
            const petId = getRandom12DigitNumber();
            const payload = {
                id: petId,
                category: {
                    id: 23,
                    name: 'kitten'
                },
                name: testCase,
                photoUrls: [
                    `${testCase}-placeholder.jpg`
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

            log(testInfo,
                'REQUEST',
                {
                    method: 'POST',
                    url: `${domain}${api}`,
                    options: options
                },
                'application/json'
            );

            log(testInfo, 'RESPONSE BODY', resBody, 'application/json');

            expect(response.status()).toBe(200);
            expect(resBody.id).toBe(petId);

            // Check GET request
            const petResponse = await request.get(`https://petstore.swagger.io/v2/pet/${petId}`);
            const petResBody = await petResponse.json();
            expect(petResponse.status()).toBe(200);
            expect(petResBody.id).toBe(petId);

            idsToCleanup.push(petId);
        });
    }

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
