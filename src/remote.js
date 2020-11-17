export async function getJson(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (e) {
        // TODO: error handling
        return undefined;
    }
}