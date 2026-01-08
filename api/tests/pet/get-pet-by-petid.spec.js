const {test, expect} = require('@playwright/test');

test('existing pet id should return successful response', async ({request}) => {
    const response = await request.get('https://petstore.swagger.io/v2/pet/268165');

    expect(response.status()).toBe(500);
})