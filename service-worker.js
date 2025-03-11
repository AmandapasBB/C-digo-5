self.addEventListener("install", (event) => {
  console.log("Service Worker instalado.");
  event.waitUntil(
    caches.open("christiebooks-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/styles.css",
        "/js/api.js",
        "/js/script.js",
        "/detalhes/detalhes.html",
        "/detalhes/detalhes.css",
        "/assets/icon-192.png",
        "/assets/icon-512.png",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
