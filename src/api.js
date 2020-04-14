/**
 * @param url - the url to fetch
 * @returns {Promise<any>}
 * @desc A utility function for fetching the JSON
 * response from an endpoint.
 */
async function getJSON(url) {
    try {
        const res = await fetch(url);
        return await res.json();
    } catch (e) {
        throw e;
    }
}

export function fetchTopics() {
    const url = "https://www.reddit.com/subreddits/popular.json?raw_json=1";
    return getJSON(url);
}

export function fetchPosts(topic) {
    const url = `https://www.reddit.com/r/${topic}/hot.json`;
    return getJSON(url);
}