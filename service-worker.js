const CACHE_NAME = 'ajudante-cache-v1';
const urlsToCache = [
  '/ajudante-app/',
  '/ajudante-app/index.html',
  '/ajudante-app/cadastrarCliente.html',
  '/ajudante-app/cadastrarMaquina.html',
  '/ajudante-app/calculoRetencao.html',
  '/ajudante-app/preFecho.html',
  '/ajudante-app/gerenciarClientes.html',
  '/ajudante-app/consultarCliente.html',
  '/ajudante-app/editarCliente.html',
  '/ajudante-app/excluirCliente.html',
  '/ajudante-app/icon-192.png',
  '/ajudante-app/icon-512.png',
  '/ajudante-app/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
