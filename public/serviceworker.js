const CACHE_NAME = "version-1";
const urlsToCache = [
  "index.html",
  "offline.html",
  // "Admin.js",
  // "AdminProducts.js",
  // "Basket.js",
  // "DarkMode.js",
  // "Footer.js",
  // "Header.js",
  // "History.js",
  // "HistoryDetails.js",
  // "Login.js",
  // "Main.js",
  // "Orders.js",
  // "Products.js",
  // "Profile/js",
  // "Users.js",
  // "App/js",
  // "constants.js",
  // "index.js",
];

const self = this;

// Install SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");

      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      // console.log(event.request);
      console.log("fetching cache");
      return fetch(event.request).catch(() => caches.matchAll());
    })
  );
});

// Activate the SW
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log("deleting old cache");
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
