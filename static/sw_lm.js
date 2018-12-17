const cacheName = 'litemonitor';

// Call Install Event
self.addEventListener('install', e => {
});

// Call Activate Event
self.addEventListener('activate', e => {
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Make copy/clone of response
        const resClone = res.clone();
        // Open cache
        caches.open(cacheName).then(cache => {
          // Add response to cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch(err => caches.match(e.request).then(res => res))
  );
});

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Notification Received.');
  const title = 'LiteMonitor';
  const options = {
    body: event.data.text(),
    icon: '/static/icons-48.png',
    // badge: '/static/icons-48.png'
  };
  event.waitUntil(self.registration.showNotification(title, options));  
});