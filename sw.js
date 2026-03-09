// YAKUZAZ Service Worker — Offline Support
const CACHE = 'YAKUZAZ-v1';
const STATIC = [
  '/',
  '/index.html',
  '/styles.css',
  '/category-styles.css',
  '/product-styles.css',
  '/tools-styles.css',
  '/main.js',
  '/category.js',
  '/product.js',
  '/js/cart.js',
  '/manifest.json',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg',
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Fraunces:ital,wght@0,300;0,600;1,300;1,600&display=swap',
];

// Install — cache static assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(STATIC)).then(() => self.skipWaiting())
  );
});

// Activate — clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch — network first, fallback to cache
self.addEventListener('fetch', e => {
  // Skip non-GET and Supabase API calls
  if (e.request.method !== 'GET') return;
  if (e.request.url.includes('supabase.co')) return;

  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Cache successful responses for HTML/CSS/JS
        if (res.ok && (
          e.request.url.includes('.html') ||
          e.request.url.includes('.css') ||
          e.request.url.includes('.js') ||
          e.request.url.includes('.svg') ||
          e.request.destination === 'document'
        )) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
