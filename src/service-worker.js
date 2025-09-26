import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: ["favicons/*"],
            manifest: {
                name: "MyWebSite",
                short_name: "MyWebSite",
                start_url: ".",
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
            // 필요 시 workbox 옵션(예: globPatterns) 추가 가능
        }),
    ],
});
