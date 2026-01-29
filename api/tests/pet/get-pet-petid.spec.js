import { test, expect } from '@playwright/test';
import { validateSchema } from '../../helpers/schema-validator';
import { log } from '../../helpers/logger';
import { getBigIntJson } from '../../helpers/helper';
import petSchema from './schema/pet-schema.json' assert {type: 'json'};

const domain = process.env.BASE_URL;
const envName = process.env.ENV;

async function getAvailablePet(request, testInfo) {
    const url = `${domain}/v2/pet/findByStatus?status=available`;
    const response = await request.get(url);
    const resBody = await getBigIntJson(response);

    log(testInfo, 'getAvailablePet REQUEST', url, 'text/plain');
    log(testInfo, 'getAvailablePet RESPONSE', resBody, 'application/json');
    
    return resBody[0].id;
}

test.beforeAll(async () => {
    console.log(`ENV: ${envName}`);
})

test.describe('GET /v2/pet - verify getting a specific pet by id', () => {
    test('request with valid pet id should return correct schema', async ({ request }, testInfo) => {
        const testId = await getAvailablePet(request, testInfo);
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
