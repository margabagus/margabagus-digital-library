
// Service Worker for Marga Bagus Digital Library
const CACHE_NAME = 'mb-library-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/favicon.png',
  '/icons/favicon-32x32.png',
  '/icons/favicon-16x16.png',
  // CSS and JS files will be added dynamically
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
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Cache-first strategy for static assets, Network-first for API calls
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  
  // For API requests, use network first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache the fetched response
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // If network fetch fails, try to get from cache
          return caches.match(request);
        })
    );
  } else {
    // For non-API requests, use cache-first strategy
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response;
          }
          
          // Clone the request because it's a one-time use
          const fetchRequest = request.clone();
          
          return fetch(fetchRequest)
            .then((response) => {
              // Check if we received a valid response
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              
              // Clone the response because it's a one-time use
              const responseToCache = response.clone();
              
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(request, responseToCache);
                });
                
              return response;
            });
        })
    );
  }
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
  // Claim any clients immediately
  self.clients.claim();
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

// Handle push notification
self.addEventListener('push', (event) => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/favicon-32x32.png',
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
