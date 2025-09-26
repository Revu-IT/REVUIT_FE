// src/serviceWorkerRegistration.js
// Vite-compatible Service Worker registration helper.
// - Uses import.meta.env instead of process.env
// - Looks for /service-worker.js under import.meta.env.BASE_URL
// - Keep the same API: register(config), unregister()

const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
        window.location.hostname === "[::1]" ||
        // 127.0.0.0/8 are considered localhost for IPv4.
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/.test(
            window.location.hostname
        )
);

export function register(config) {
    // Only register in production builds and when SW is supported
    if (import.meta.env.PROD && "serviceWorker" in navigator) {
        // Vite: BASE_URL equals '/' (root) by default, or '/my-app/' when base is set.
        const base = import.meta.env.BASE_URL || "/";
        // service-worker.js must be placed in the "public/" folder (so it is served from BASE_URL)
        const swUrl = `${base}service-worker.js`;

        window.addEventListener("load", () => {
            if (isLocalhost) {
                // On localhost, validate if the service worker actually exists
                checkValidServiceWorker(swUrl, config);

                navigator.serviceWorker.ready.then(() => {
                    console.log(
                        "This web app is being served cache-first by a service worker (dev/local)."
                    );
                });
            } else {
                // Not localhost: just register
                registerValidSW(swUrl, config);
            }
        });
    }
}

function registerValidSW(swUrl, config) {
    navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                if (!installingWorker) return;

                installingWorker.onstatechange = () => {
                    if (installingWorker.state === "installed") {
                        if (navigator.serviceWorker.controller) {
                            // New content is available; it will be used after all tabs are closed.
                            console.log(
                                "New content is available and will be used when all tabs for this page are closed."
                            );
                            config?.onUpdate?.(registration);
                        } else {
                            // Content cached for offline use.
                            console.log("Content is cached for offline use.");
                            config?.onSuccess?.(registration);
                        }
                    }
                };
            };
        })
        .catch((error) => {
            console.error("Error during service worker registration:", error);
        });
}

function checkValidServiceWorker(swUrl, config) {
    // Check if the service worker can be found. If it can't, reload the page after unregistering.
    fetch(swUrl, { headers: { "Service-Worker": "script" } })
        .then((response) => {
            const contentType = response.headers.get("content-type");
            if (
                response.status === 404 ||
                (contentType && !contentType.includes("javascript"))
            ) {
                // No service worker found. Probably a different app. Reload the page.
                navigator.serviceWorker.ready.then((registration) => {
                    registration.unregister().then(() => {
                        window.location.reload();
                    });
                });
            } else {
                // Service worker found. Proceed as normal.
                registerValidSW(swUrl, config);
            }
        })
        .catch(() => {
            console.log(
                "No internet connection found. App is running in offline mode."
            );
        });
}

export function unregister() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.ready
            .then((registration) => registration.unregister())
            .catch((error) => {
                console.error(error.message);
            });
    }
}
