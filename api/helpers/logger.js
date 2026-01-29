export async function log(testInfo, name, content, contentType) {
    if (contentType === 'text/plain') {
        await testInfo.attach(name, {
            body: content,
            contentType: contentType
        });
    }
    else if (contentType === 'application/json') {
        await testInfo.attach(name, {
            body: JSON.stringify(content, null, 2),
            contentType: contentType
        })
    }
}
