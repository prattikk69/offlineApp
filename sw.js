    const CACHE_NAME = 'offline-v1';
    const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/offline.html'
    ];

    // Install: Cache essential files
    self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
    );
    });

    // Fetch: Serve files from cache if network fails
    self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
        return response || fetch(event.request);
        }).catch(() => caches.match('/offline.html'))
    );
    });