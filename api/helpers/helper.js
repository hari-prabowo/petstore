const JSONbig = require('json-bigint')();

async function getBigIntJson(playwrightResponse) {
    const resText = await playwrightResponse.text();
    const resBody = await JSONbig.parse(resText);

    return resBody;
}

module.exports = {
    getBigIntJson
}