const { test, expect } = require('@playwright/test');

const idsToCleanup = [];

test.skip('should create a new pet successfully with valid parameters', async ({ request }) => {
    const payload = {
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
        status: 'available'
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
    expect(resBody.id).toBeDefined();

    const resBodyId = resBody.id;

    console.log(`https://petstore.swagger.io/v2/pet/${resBodyId}`);
    
    let petResStatus = 0;
    let petResponse;
    for (let i=0; i<5; i++) {
        petResponse = await request.get(`https://petstore.swagger.io/v2/pet/${resBodyId}`);
        petResStatus = petResponse.status();
        console.log(`Status: ${petResStatus}`);
        if (petResStatus === 200) break;
    }

    const petResBody = await petResponse.json();
    console.log(petResBody);
    expect(petResStatus).toBe(200);
    expect(petResBody.id).toBe(resBodyId);

    idsToCleanup.push(resBodyId);
});

// test.afterEach(async ({request}) => {
//     for (const id of idsToCleanup) {
//         const response = await request.delete(`https://petstore.swagger.io/v2/pet${id}`);
//         const resBody = await response.json();

//         console.log(resBody);

//         expect(response.status()).toBe(200);
//     }
// });