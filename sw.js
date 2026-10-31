/* Service Worker: macht die App offline nutzbar. Nach Änderungen an den Dateien VERSION erhöhen. */
const VERSION = 'abo-v8';
const SHELL = ['./', 'index.html', 'config.js', 'supabase.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.origin === self.location.origin) {
    /* Eigene Dateien: erst Netz (damit Änderungen ankommen), sonst Zwischenspeicher */
    e.respondWith(
      fetch(req, { cache: 'no-cache' })
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(VERSION).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match('index.html')))
    );
  } else if (/(^|\.)(fonts\.googleapis\.com|fonts\.gstatic\.com)$/.test(url.hostname)) {
    /* Schriften: einmal laden, dann aus dem Zwischenspeicher */
    e.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            const copy = res.clone();
            caches.open(VERSION).then((c) => c.put(req, copy));
            return res;
          })
      )
    );
  }
  /* Alles andere (z. B. Supabase) geht ungehindert ans Netz */
});
