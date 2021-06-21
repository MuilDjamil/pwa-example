const CACHE_NAME = "Cachev1";
var urlsToCache = [
  "/",
  "/manifest.json",
  "/index.html",
  "/nav.html",
  "/pages/mercenaries.html",
  "/pages/zombies.html",
  "/pages/about.html",
  "/pages/home.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/images/icons/icon-72x72.png",
  "/images/icons/icon-96x96.png",
  "/images/icons/icon-128x128.png",
  "/images/icons/icon-144x144.png",
  "/images/icons/icon-152x152.png",
  "/images/icons/icon-192x192.png",
  "/images/icons/icon-384x384.png",
  "/images/icons/icon-512x512.png",
  "/images/mercenaries/leon.png",
  "/images/mercenaries/ada.png",
  "/images/mercenaries/jack.png",
  "/images/mercenaries/hunk.png",
  "/images/mercenaries/redflower.jpg",
  "/images/mercenaries/jaw.jpg",
  "/images/mercenaries/snake.jpg",
  "/images/mercenaries/cobra.jpg",
  "/images/zombies/donmanuel.png",
  "/images/zombies/iluminado.png",
  "/images/zombies/soldado.png",
  "/images/zombies/chainsaw.png",
  "/images/home.jpg"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }

        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
