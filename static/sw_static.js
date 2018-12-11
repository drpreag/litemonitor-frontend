const cacheName = "v1";

const filesToCache = [
  "/",
  "/index.html",
  "/src/assets/style.css",
  "/src/main.js",
  "/app.js",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
  "https://use.fontawesome.com/releases/v5.0.8/css/all.css",
  "https://fonts.googleapis.com/css?family=Montserrat"
];

// Cache known assets up-front
const preCache = () =>
  caches.open(cacheName).then( cache => {
    cache.addAll(filesToCache);
  });

// Handle the 'install' event
self.addEventListener('install', event => {
  event.waitUntil(preCache());
});

// Handle the 'ativate' event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map (cache => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
      }))
  }));
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      return response || fetch(event.request);
    })
  );
});

// self.addEventListener('fetch', event => {
//   console.log('Fetch event for ', event.request.url);
//   event.respondWith(
//     caches.match(event.request)
//     .then(response => {
//       if (response) {
//         console.log('Found ', event.request.url, ' in cache');
//         return response;
//       }
//       console.log('Network request for ', event.request.url);
//       return fetch(event.request)

//       // TODO 4 - Add fetched files to the cache

//     }).catch(error => {

//       // TODO 6 - Respond with custom offline page

//     })
//   );
// });

