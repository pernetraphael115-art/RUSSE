const CACHE_NAME = 'ruska-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/styles.css',
  './fonts/manrope-latin.woff2',
  './fonts/manrope-cyr.woff2',
  './fonts/unbounded-latin.woff2',
  './fonts/unbounded-cyr.woff2',
  './icons/favicon.png',
  './icons/apple-touch-icon.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './js/app.js',
  './js/store.js',
  './js/srs.js',
  './js/tts.js',
  './js/text.js',
  './js/data/levels.js',
  './js/data/alphabet.js',
  './js/data/units_a0.js',
  './js/views/home.js',
  './js/views/review.js',
  './js/views/practice.js',
  './js/views/lexicon.js',
  './js/views/profile.js',
  './js/views/unit.js',
  './js/views/flashcards.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cache or fallback to network
        return response || fetch(event.request).catch(() => {
          // Fallback to index.html for navigation requests (SPA)
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
