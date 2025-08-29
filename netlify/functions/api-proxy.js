export async function handler(event) {
    // Netlify 환경 변수 읽기
    const baseUrl = process.env.VITE_REACT_APP_API_URL;

    if (!baseUrl) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "API URL not configured" }),
        };
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
        headers: {
            "Content-Type": response.headers.get("content-type") || "application/json",
        },
    };
}
