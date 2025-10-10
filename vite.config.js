// vite.config.js
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
    // ✅ process.cwd() 대신 '.' 사용
    const env = loadEnv(mode, ".", ""); // VITE_*만 노출

    return {
        plugins: [
            react(),
            VitePWA({
                registerType: "autoUpdate",
                strategies: "generateSW",
                includeAssets: [
                    "favicons/favicon.ico",
                    "favicons/apple-touch-icon.png",
                ],
                manifest: {
                    name: "RevU-IT",
                    short_name: "RevU",
                    start_url: "/",
                    scope: "/",
                    display: "standalone",
                    background_color: "#ffffff",
                    theme_color: "#ffffff",
                    icons: [
                        {
                            src: "/favicons/android-chrome-192x192.png",
                            sizes: "192x192",
                            type: "image/png",
                        },
                        {
                            src: "/favicons/android-chrome-512x512.png",
                            sizes: "512x512",
                            type: "image/png",
                        },
                    ],
                },
                workbox: {
                    runtimeCaching: [
                        {
                            urlPattern: ({ url }) =>
                                url.pathname.startsWith("/api"),
                            handler: "NetworkFirst",
                            options: {
                                cacheName: "api-cache",
                                networkTimeoutSeconds: 10,
                                matchOptions: { ignoreSearch: true },
                            },
                        },
                        {
                            urlPattern: ({ request }) =>
                                request.destination === "image",
                            handler: "CacheFirst",
                            options: {
                                cacheName: "image-cache",
                                expiration: {
                                    maxEntries: 100,
                                    maxAgeSeconds: 60 * 60 * 24 * 30,
                                },
                            },
                        },
                    ],
                },
            }),
        ],
        server: {
            proxy: {
                "/api": {
                    target: env.VITE_REACT_APP_API_URL,
                    changeOrigin: true,
                    rewrite: (p) => p.replace(/^\/api/, ""),
                },
            },
        },
    };
});
