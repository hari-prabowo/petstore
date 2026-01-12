function validateSchema(obj, schema) {
    for (const key in schema.properties) {
        if (!(key in obj)) {
            throw new Error(`Missing field: ${key}`);
        }

        const actualType = Array.isArray(obj[key]) ? 'array' : typeof obj[key];
        const expectedType = schema.properties[key].type;
        if (actualType !== expectedType) {
            throw new Error(`Found ${key} to be of type: ${actualType} instead of expected: ${expectedType}`);
        }
    }
    return true;
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