const CACHE_NAME = 'ajudante-cache-v1';
const urlsToCache = [
  '/ajudante_pwa/',
  '/ajudante_pwa/index.html',
  '/ajudante_pwa/cadastrarCliente.html',
  '/ajudante_pwa/cadastrarMaquina.html',
  '/ajudante_pwa/calculoRetencao.html',
  '/ajudante_pwa/preFecho.html',
  '/ajudante_pwa/gerenciarClientes.html',
  '/ajudante_pwa/consultarCliente.html',
  '/ajudante_pwa/editarCliente.html',
  '/ajudante_pwa/excluirCliente.html',
  '/ajudante_pwa/icon-192.png',
  '/ajudante_pwa/icon-512.png',
  '/ajudante_pwa/manifest.json',
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
