const cacheName = "ercan-ajan-v16";
const appShell = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js?v=16",
  "./manifest.webmanifest",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(appShell);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (savedCacheName) {
            return savedCacheName !== cacheName;
          })
          .map(function (savedCacheName) {
            return caches.delete(savedCacheName);
          })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  const request = event.request;
  const requestUrl = new URL(request.url);

  if (
    request.method !== "GET" ||
    requestUrl.origin !== self.location.origin
  ) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(function (response) {
          const responseCopy = response.clone();
          caches.open(cacheName).then(function (cache) {
            cache.put("./index.html", responseCopy);
          });
          return response;
        })
        .catch(function () {
          return caches.match("./index.html");
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(function (cachedResponse) {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then(function (response) {
        if (!response.ok) {
          return response;
        }

        const responseCopy = response.clone();
        caches.open(cacheName).then(function (cache) {
          cache.put(request, responseCopy);
        });
        return response;
      });
    })
  );
});
