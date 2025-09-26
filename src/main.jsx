// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// Vite 호환 register()는 내부에서 import.meta.env.PROD를 체크하므로 그냥 호출해도 안전
serviceWorkerRegistration.register();
