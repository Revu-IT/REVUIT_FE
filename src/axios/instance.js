// src/axios/instance.js
import axios from "axios";
import { getAccessToken, removeCookie } from "./token";

const api = axios.create({
    baseURL: "/api", // 프록시 경로
    headers: { "Content-Type": "application/json" },
});

// ✅ 1) 요청 인터셉터: Authorization 자동 첨부
api.interceptors.request.use(
    (config) => {
        const token = getAccessToken(); // "Bearer xxx" 형태
        if (token) config.headers.Authorization = token;
        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ 2) 응답 인터셉터: 401이면 강제 로그아웃 처리
api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const { response } = error;

        // 네트워크 에러 등 response가 없을 때
        if (!response) return Promise.reject(error);

        // 인증 만료 또는 잘못된 토큰 → 쿠키 삭제 후 로그인 페이지로 이동
        if (response.status === 401) {
            console.warn("⚠️ 인증 만료: 자동 로그아웃 처리");
            removeCookie("accessToken");
            removeCookie("refreshToken");
            // 현재 페이지 유지하지 않고 로그인 페이지로 이동
            window.location.href = "/signin";
        }

        return Promise.reject(error);
    }
);

export default api;
