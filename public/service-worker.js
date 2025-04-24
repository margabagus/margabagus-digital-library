
// Service Worker for Marga Bagus Digital Library
const CACHE_NAME = 'mb-library-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  // CSS, JS and other assets will be added dynamically
];

// Install the service worker and cache initial assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Network first, falling back to cache strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache the fetched response
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // If network fetch fails, try to get from cache
        return caches.match(event.request);
      })
  );
});

// Update service worker and clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Handle book content saving for offline reading
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_BOOK') {
    const { bookId, bookContent, bookMetadata } = event.data;
    
    caches.open(`book-${bookId}`).then((cache) => {
      // Store book content in a dedicated cache
      const bookContentBlob = new Blob([JSON.stringify(bookContent)], { 
        type: 'application/json' 
      });
      const bookContentResponse = new Response(bookContentBlob);
      
      cache.put(`/api/books/${bookId}/content`, bookContentResponse);
      
      // Store book metadata
      const bookMetadataBlob = new Blob([JSON.stringify(bookMetadata)], { 
        type: 'application/json' 
      });
      const bookMetadataResponse = new Response(bookMetadataBlob);
      
      cache.put(`/api/books/${bookId}/metadata`, bookMetadataResponse);
    });
  }
});
