import { test, expect } from '@playwright/test'
import { log } from '../../helpers/logger';

const domain = process.env.BASE_URL;
const envName = process.env.ENV;
const api = '/v2/pet/findByStatus';

async function verifyFindByStatus(request, status) {
    const url = `${domain}${api}?status=${status}`;
    const response = await request.get(url);
    const resBody = await response.json();

    const allStatusCorrect = resBody.every(pet => pet.status === status);
    return {result: allStatusCorrect, response: resBody};
}

test.beforeAll(async () => {
    console.log(`ENV: ${envName}`);
})

test.describe('GET /v2/pet/findByStatus - verify getting list of pets by status', () => {

    const testCasesValid = ['available', 'pending']

    for (const testCase of testCasesValid) {
        test(`should only return pets with the status=${testCase}`, async ({ request }, testInfo) => {
            const status = testCase;
            const testResult = await verifyFindByStatus(request, status);

            log(testInfo, 'REQUEST', `GET ${domain}${api}?status=${status}`, 'text/plain');
            log(testInfo, 'RESPONSE', testResult.response, 'application/json');

            expect(testResult.result).toBe(true, { message: `All items should have status = ${status}` });
        });
    }
});
