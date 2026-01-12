const { test, expect } = require('@playwright/test');
const { log } = require('../../helpers/logger');
const domain = process.env.BASE_URL;
const envName = process.env.ENV;
const api = '/v2/pet/findByStatus';

async function verifyFindByStatus(request, status, testInfo) {
    const url = `${domain}${api}?status=${status}`;
    const response = await request.get(url);
    const resBody = await response.json();

    let allStatusCorrect = true;
    for (const pet of resBody) {
        if (pet.status !== status) {
            allStatusCorrect = false;
            break;
        }
    }

    return {result: allStatusCorrect, response: resBody};
}

test.beforeAll(async () => {
    console.log(`ENV: ${envName}`);
})

test.describe('GET /v2/pet/findByStatus - verify getting list of pets by status', () => {
    test('should only return pets with the status=available', async ({ request }, testInfo) => {
        const status = 'available';
        const testResult = await verifyFindByStatus(request, status);

        log(testInfo, 'REQUEST', `GET ${domain}${api}?status=${status}`, 'text/plain');
        log(testInfo, 'RESPONSE', testResult.response, 'application/json');

        expect(testResult.result).toBe(true);
    });

    test('should only return pets with the status=pending', async ({ request }, testInfo) => {
        const status = 'pending';
        const testResult = await verifyFindByStatus(request, status);

        log(testInfo, 'REQUEST', `GET ${domain}${api}?status=${status}`, 'text/plain');
        log(testInfo, 'RESPONSE', testResult.response, 'application/json');

        expect(testResult.result).toBe(true);
    });
});
