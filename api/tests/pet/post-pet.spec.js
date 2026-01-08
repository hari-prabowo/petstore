const { test, expect } = require('@playwright/test');

const idsToCleanup = [];

function getRandom12DigitNumber() {
  return Math.floor(100000000000 + Math.random() * 900000000000);
}

test('should create a new pet Cat1 successfully with valid parameters', async ({ request }) => {
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
    }

    const options = {
        data: payload,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = await request.post('https://petstore.swagger.io/v2/pet', options);
    const resBody = await response.json();

    console.log(resBody);
    expect(response.status()).toBe(200);
    expect(resBody.id).toBe(petId);

    // Check GET request
    console.log(`REQUEST: https://petstore.swagger.io/v2/pet/${petId}`);
    
    const petResponse = await request.get(`https://petstore.swagger.io/v2/pet/${petId}`);
    const petResBody = await petResponse.json();

    console.log(petResBody);
    expect(petResponse.status()).toBe(200);
    expect(petResBody.id).toBe(petId);

    idsToCleanup.push(petId);
});

test('should create a new pet Cat2 successfully with valid parameters', async ({ request }) => {
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
    }

    const options = {
        data: payload,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = await request.post('https://petstore.swagger.io/v2/pet', options);
    const resBody = await response.json();

    console.log(resBody);
    expect(response.status()).toBe(200);
    expect(resBody.id).toBe(petId);

    // Check GET request
    console.log(`REQUEST: https://petstore.swagger.io/v2/pet/${petId}`);
    
    const petResponse = await request.get(`https://petstore.swagger.io/v2/pet/${petId}`);
    const petResBody = await petResponse.json();

    console.log(petResBody);
    expect(petResponse.status()).toBe(200);
    expect(petResBody.id).toBe(petId);

    idsToCleanup.push(petId);
});

test.afterAll(async ({request}) => {
    for (const id of idsToCleanup) {
        const response = await request.delete(`https://petstore.swagger.io/v2/pet/${id}`);
        expect(response.status()).toBe(200);
    }
    console.log(`SUCCESSFULLY DELETED PET IDS: ${idsToCleanup}`)
});