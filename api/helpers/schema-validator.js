async function isKeyRequired(key, schema) {
    if (!('required' in schema) || schema.required.length === 0) return false;
    return schema.required.includes(key);
}

async function validateSchema(obj, schema) {
    let res = true;
    const resItems = [];

    for (const key in schema.properties) {
        const keyRequired = await isKeyRequired(key, schema);
        const keyExists = key in obj;

        if (keyRequired && !keyExists) {
            resItems.push({
                key: key,
                result: false,
                message: `Missing field: ${key}`
            });
            res = false;
        }
        else if(keyExists) {
            const actualType = Array.isArray(obj[key]) ? 'array' : typeof obj[key];
            const expectedType = schema.properties[key].type;
            if (actualType !== expectedType) {
                resItems.push({
                    key: key,
                    result: false,
                    message: `Key ${key} has type: ${actualType} instead of expected: ${expectedType}`
                });
            res = false;
            }
            else {
                resItems.push({
                    key: key,
                    result: true,
                    message: `Key ${key} is found and has expected type: ${actualType}`
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
                else if (actualType === 'array') {
                    if (typeof obj[key][0] === 'object') {
                        for (const item of obj[key]) {
                            const nestedRes = await validateSchema(item, schema.properties[key].items);;
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
                    else {
                        const resArrayValidation = await validateArray(key, obj[key], schema.properties[key].items.type);
                        resItems.push({
                            key: resArrayValidation.key,
                            result: resArrayValidation.result,
                            message: resArrayValidation.message
                        });
                    }
                }
            }
        }
    }
    return { result: res, resultItems: resItems };
}

async function validateArray(key, array, type) {
    const res = true;
    let message = `Key ${key} has expected type: ${type}`;
    for (const item in array) {
        if (!(typeof item === type)) {
            result = false;
            message = `Expected ${key} item type: ${type} but found: ${typeof item} instead`;
            break;
        }
    }
    return { key: key, result: res, message: message };
}

module.exports = { 
    validateSchema,
    validateArray 
};
