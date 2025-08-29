// src/axios/instance.js
import axios from "axios";
import { getAccessToken, getRefreshToken, setCookie, removeCookie } from "./token";

const api = axios.create({
    baseURL: "/", // ← Vite 프록시
    headers: { "Content-Type": "application/json" },
    // withCredentials: true, // 쿠키 인증이면 켜고, 지금은 Bearer 헤더 방식이니 불필요
});

// 1) 요청 인터셉터: Authorization 자동 첨부
api.interceptors.request.use((config) => {
    const token = getAccessToken(); // 네 코드에 맞춰 "Bearer xxx" 형태가 쿠키에 저장됨
    if (token) config.headers.Authorization = token;
    return config;
});

// 2) 응답 인터셉터: 401이면 한 번만 리프레시 시도 후 재요청
let isRefreshing = false;
let pendingQueue = [];

const processQueue = (error, newToken) => {
    pendingQueue.forEach(({ resolve, reject, config }) => {
        if (error) reject(error);
        else {
            if (newToken) config.headers.Authorization = newToken;
            resolve(api(config));
        }
    });
    pendingQueue = [];
};

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const { response, config } = error;
        if (!response) return Promise.reject(error);

        // 인증 실패
        if (response.status === 401 && !config._retry) {
            config._retry = true;

            // 이미 리프레시 중이면 큐에 쌓고 리턴
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    pendingQueue.push({ resolve, reject, config });
                });
            }

            isRefreshing = true;

            try {
                const refreshToken = getRefreshToken();
                if (!refreshToken) throw error;

                // 주의: 여기서는 기본 axios 사용(무한루프 방지). 프록시 경로 그대로 사용.
                const refreshRes = await axios.post("/api/user/refresh", {
                    refresh_token: refreshToken,
                });

                const { access_token, token_type = "Bearer", expires_in = 3600 } = refreshRes.data || {};
                const newAuth = `${token_type} ${access_token}`;

                // 새 토큰 저장 & 큐 처리
                setCookie("accessToken", newAuth, expires_in);
                config.headers.Authorization = newAuth;

                processQueue(null, newAuth);
                return api(config); // 실패했던 요청 재시도
            } catch (e) {
                // 리프레시 실패 → 토큰 정리
                removeCookie("accessToken");
                removeCookie("refreshToken");
                processQueue(e);
                return Promise.reject(e);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
