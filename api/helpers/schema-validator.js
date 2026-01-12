async function validateSchema(obj, schema) {
    let res = true;
    const resItems = [];

    for (const key in schema.properties) {
        if (!(key in obj)) {
            resItems.push({
                key: key,
                result: false,
                message: `Missing field: ${key}`
            });
            res = false;
        }
        else {
            const actualType = Array.isArray(obj[key]) ? 'array' : typeof obj[key];
            const expectedType = schema.properties[key].type;
            if (actualType !== expectedType) {
                resItems.push({
                    key: key,
                    result: false,
                    message: `Key ${key} is type: ${actualType} instead of expected: ${expectedType}`
                });
            res = false;
            }
            else {
                resItems.push({
                    key: key,
                    result: true,
                    message: `Key ${key} is found and has type: ${actualType}`
                });

                if (actualType === 'object') {
                    const nestedRes = await validateSchema(obj[key], schema.properties[key]);
                    for (const nestedItem of nestedRes.resultItems) {
                        resItems.push({
                            key: `${key}.${nestedItem.key}`,
                            result: nestedItem.result,
                            message: nestedItem.message
                        });
                    }
                    if (nestedRes.result === false) res = false;
                }
            }
        }
    }
    return { result: res, resultItems: resItems };
}

function validateArray(array, type) {
    for (const item in array) {
        if (!(typeof item === 'string')) {
            throw new Error(`Expected item type ${type} but found ${typeof item} instead`);
        }
    }
    return true;
}

module.exports = { 
    validateSchema,
    validateArray 
};

// {
//   "type": "object",
//   "required": ["id", "name", "photoUrls"],
//   "properties": {
//     "id": { "type": "number" },
//     "name": { "type": "string" },
//     "photoUrls": { 
//         "type": "array",
//         "items": { "type": "string"}
//     },
//     "category": {
//         "type": "object",
//         "required": ["id", "name"],
//         "properties": {
//             "id": {"type": "number"},
//             "name": {"type": "string"}
//         }
//     },
//     "tags": {
//         "type": "array",
//         "items": {
//             "type": "object",
//             "required": ["id", "name"],
//             "properties": {
//                 "id": {"type": "number"},
//                 "name": {"type": "string"}
//             }
//         }
//     },
//     "status": "string"
//   }
// }