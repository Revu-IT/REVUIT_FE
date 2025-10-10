// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { registerSW } from "virtual:pwa-register";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {/* Netlify 루트 배포면 basename 없이 사용하는 게 가장 안전 */}
        <BrowserRouter>
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// 서비스워커 등록
registerSW({
    immediate: true,
    onNeedRefresh() {
        if (confirm("새 버전이 있습니다. 새로고침할까요?")) location.reload();
    },
    onOfflineReady() {
        console.log("오프라인 준비 완료");
    },
});
