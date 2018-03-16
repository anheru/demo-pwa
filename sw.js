const CACHE_NAME = 'pwa-demo',
urlsToCache = [
  '/',
  './',
  './?utm=homescreen',
  './index.html',
  './index.html?utm=homescreen',
  './style.css',
  './script.js',
  './sw.js',
  './favicon.ico',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
]

self.addEventListener('install', e => {
  console.log('Evento: SW Instalado')
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos en cache')
        return cache.addAll(urlsToCache)
      })
      .catch(err => console.log('Fallo registro de cache', err))
  )
})

self.addEventListener('activate', e => {
  console.log('Evento: SW Activo')
  const cacheList = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cachesNames => {
        return Promise.all(
          cachesNames.map(cacheName => {
            if (cacheList.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('El cache esta limpio y actualizado')
        return self.clients.claim()
      })
  )
})

self.addEventListener('fetch', e => {
  console.log('Evento: SW Recuperando')
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          return res
        }

        return fetch(e.request)
          .then(res => {
            let resToCache = res.clone()

            caches.open([CACHE_NAME])
              .then(cache => {
                cache
                  .put(e.request, resToCache)
                  .catch(err => console.log(`${request.url}: ${err.message}`))
              })

            return res
          })
      })
  )
})