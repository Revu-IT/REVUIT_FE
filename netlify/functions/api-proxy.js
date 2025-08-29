export async function handler(event) {
    const baseUrl = process.env.VITE_REACT_APP_API_URL; // Netlify에 등록된 값

    if (!baseUrl) {
        return { statusCode: 500, body: "API URL not configured" };
    }

    const path = event.path.replace("/.netlify/functions/api-proxy", "");
    const url = `${baseUrl}${path}`;

    const response = await fetch(url, {
        method: event.httpMethod,
        headers: { ...event.headers, host: undefined },
        body: ["GET", "HEAD"].includes(event.httpMethod) ? undefined : event.body,
    });

    return {
        statusCode: response.status,
        body: await response.text(),
        headers: { "Content-Type": response.headers.get("content-type") || "application/json" },
    };
}
