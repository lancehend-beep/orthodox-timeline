/* =====================================================================
   ORTHODOX TIMELINE — SERVICE WORKER (offline support)
   =====================================================================
   What this does, in plain words:
   - The first time the app is opened, it saves a copy of every file the
     app needs, so it can open later without internet.
   - Whenever there IS internet, it always fetches the newest version of
     each file first (and saves that copy), so changes you publish reach
     the installed app the next time it is opened online.
   - Without internet, it uses the saved copies.

   You normally never need to edit this file. If you ADD a new file that
   the app needs (for example a new .js file), add its name to APP_FILES
   below and change VERSION (any new text works, e.g. "v2").
   ===================================================================== */

const VERSION = "v1";
const APP_CACHE = `orthodox-timeline-${VERSION}`;
const FONT_CACHE = "orthodox-timeline-fonts";
const NETWORK_TIMEOUT_MS = 4000;

const APP_FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./data.js",
  "./paths.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-192.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png"
];

// Save every app file when the service worker is first installed.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(APP_CACHE)
      .then((cache) => cache.addAll(APP_FILES.map((url) => new Request(url, { cache: "reload" }))))
      .then(() => self.skipWaiting())
  );
});

// Remove copies left over from older versions, then take control right away.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys
        .filter((k) => k.startsWith("orthodox-timeline-") && k !== APP_CACHE && k !== FONT_CACHE)
        .map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (url.origin === self.location.origin) {
    event.respondWith(networkFirst(event, req));
    return;
  }
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    event.respondWith(fontCache(req));
  }
  // Every other website (the reading links) is left alone.
});

// Newest version from the internet first; the saved copy if offline or very slow.
async function networkFirst(event, req) {
  const cache = await caches.open(APP_CACHE);
  const fromNetwork = fetch(req, { cache: "no-cache" }).then((res) => {
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  });
  // keep the cache refresh going even if we answer from the saved copy
  event.waitUntil(fromNetwork.catch(() => {}));

  try {
    return await withTimeout(fromNetwork, NETWORK_TIMEOUT_MS);
  } catch (_) {
    const saved = await cache.match(req, { ignoreSearch: true });
    if (saved) return saved;
    if (req.mode === "navigate") {
      const page = await cache.match("./index.html");
      if (page) return page;
    }
    return fromNetwork; // nothing saved: let the browser show its normal error
  }
}

// Fonts rarely change: use the saved copy, and fetch it once if missing.
async function fontCache(req) {
  const cache = await caches.open(FONT_CACHE);
  const saved = await cache.match(req);
  if (saved) return saved;
  const res = await fetch(req);
  if (res && (res.ok || res.type === "opaque")) cache.put(req, res.clone());
  return res;
}

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("timeout")), ms);
    promise.then((v) => { clearTimeout(t); resolve(v); }, (e) => { clearTimeout(t); reject(e); });
  });
}
