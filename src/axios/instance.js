// src/axios/instance.js
import axios from "axios";
import { getAccessToken, getRefreshToken, setCookie, removeCookie } from "./token";

const api = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL + "/api",
    headers: { "Content-Type": "application/json" },
});

// 1) 요청 인터셉터: Authorization 자동 첨부
api.interceptors.request.use((config) => {
    const token = getAccessToken(); // "Bearer xxx" 형태
    if (token) config.headers.Authorization = token;
    return config;
});

// 2) 응답 인터셉터: 401이면 리프레시 후 재요청
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

        if (response.status === 401 && !config._retry) {
            config._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    pendingQueue.push({ resolve, reject, config });
                });
            }

            isRefreshing = true;

            try {
                const refreshToken = getRefreshToken();
                if (!refreshToken) throw error;

                // 기본 axios 사용 → 프록시 포함
                const refreshRes = await axios.post("/api/user/refresh", {
                    refresh_token: refreshToken,
                });

                const { access_token, token_type = "Bearer", expires_in = 3600 } = refreshRes.data || {};
                const newAuth = `${token_type} ${access_token}`;

                // 새 토큰 저장 & 큐 처리
                setCookie("accessToken", newAuth, expires_in);
                config.headers.Authorization = newAuth;

                processQueue(null, newAuth);
                return api(config);
            } catch (e) {
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
