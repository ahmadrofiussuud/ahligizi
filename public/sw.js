const CACHE_NAME = 'cekgizi-cache-v1';
const urlsToCache = [
  '/app',
  '/landing/cekat_logo.png',
  '/favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Add files to cache, but don't fail installation if some fail (e.g. offline-first dev)
      return cache.addAll(urlsToCache).catch(() => {});
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
