import JSONbig from 'json-bigint';

const jsonBig = JSONbig();

export async function getBigIntJson(playwrightResponse) {
    const resText = await playwrightResponse.text();
    const resBody = await jsonBig.parse(resText);

    return resBody;
}
