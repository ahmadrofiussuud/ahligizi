const CACHE_NAME = 'cekgizi-cache-v2';
const urlsToCache = [
  '/landing/cekat_logo.png',
  '/favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch(() => {});
    })
  );
  self.skipWaiting(); // Force update immediately
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Bypass cache for development HMR, internal Next.js assets, and API endpoints
  if (
    event.request.url.includes('/api/') || 
    event.request.url.includes('/_next/') ||
    event.request.url.includes('webpack') ||
    event.request.method !== 'GET'
  ) {
    return;
  }

  // Network-First Strategy
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful network responses
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache if offline or network fails
        return caches.match(event.request);
      })
  );
});
