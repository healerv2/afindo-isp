const CACHE_NAME = "afindo-cache-v1"
const urlsToCache = [
  "/",
  "/login",
  "/dashboard",
  "/pelanggan",
  "/keuangan",
  "/infra",
  "/karyawan",
  "/mitra",
  "/paket",
  "/area",
  "/notifikasi",
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    }),
  )
})

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response
      }
      return fetch(event.request)
    }),
  )
})
