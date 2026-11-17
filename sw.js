console.log('test');

//service worker pro cattrack
// jenom nazev cache
const CACHE_NAME = 'cattrack-cache-v5';

// seznam souboru k ulozeni
const FILES = [
  '/',  
  '/index.html',
  '/icon-192.png',
  '/icon-512.png',
  '/style.css',
  '/manifest.json'
];

// install 
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES);
    })
  );
});
// fetch 
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
//activate
self.addEventListener ('activate' , (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});