export async function handler(event, context) {
    // CORS 프리플라이트 요청 처리
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            },
            body: "",
        };
    }

    const baseUrl = process.env.VITE_REACT_APP_API_URL || "https://carely-backend.site";

    // 디버깅 로그
    console.log("=== API Proxy Debug ===");
    console.log("Original path:", event.path);
    console.log("HTTP Method:", event.httpMethod);
    console.log("Base URL:", baseUrl);
    console.log("Headers:", event.headers);
    console.log("Body:", event.body);

    // 경로에서 프록시 부분 제거
    let path = event.path.replace("/.netlify/functions/api-proxy", "");
    // /api로 시작하는 경우 /api 부분도 제거 (프록시용 경로이므로)
    if (path.startsWith("/api")) {
        path = path.replace("/api", "");
    }
    const targetUrl = `${baseUrl}${path}`;

    console.log("Target URL:", targetUrl);

    try {
        // 요청 헤더 정리 (Netlify 관련 헤더 제거)
        const cleanHeaders = {};
        Object.keys(event.headers).forEach((key) => {
            const lowerKey = key.toLowerCase();
            // 제거할 헤더들
            if (!["host", "x-forwarded-for", "x-forwarded-proto", "x-netlify-id"].includes(lowerKey)) {
                cleanHeaders[key] = event.headers[key];
            }
        });

        // Content-Type 명시적 설정
        if (event.body && !cleanHeaders["content-type"] && !cleanHeaders["Content-Type"]) {
            cleanHeaders["Content-Type"] = "application/json";
        }

        const fetchOptions = {
            method: event.httpMethod,
            headers: cleanHeaders,
        };

        // GET, HEAD가 아닌 경우에만 body 추가
        if (!["GET", "HEAD"].includes(event.httpMethod) && event.body) {
            fetchOptions.body = event.body;
        }

        console.log("Fetch options:", fetchOptions);

        const response = await fetch(targetUrl, fetchOptions);
        const responseText = await response.text();

        console.log("Backend response status:", response.status);
        console.log("Backend response body:", responseText);

        // 응답 헤더 가져오기
        const responseHeaders = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        };

        // Content-Type 설정
        const contentType = response.headers.get("content-type");
        if (contentType) {
            responseHeaders["Content-Type"] = contentType;
        }

        return {
            statusCode: response.status,
            headers: responseHeaders,
            body: responseText,
        };
    } catch (error) {
        console.error("=== Proxy Error ===");
        console.error("Error:", error.message);
        console.error("Stack:", error.stack);

        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                error: "Proxy request failed",
                message: error.message,
                targetUrl: targetUrl,
            }),
        };
    }
}
