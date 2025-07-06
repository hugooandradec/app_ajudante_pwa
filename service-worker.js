const CACHE_NAME = 'ajudante-cache-v1';
const urlsToCache = [
  '/app_ajudante_pwa/', // Força carregar index.html como raiz
  '/app_ajudante_pwa/index.html',
  '/app_ajudante_pwa/cadastrarCliente.html',
  '/app_ajudante_pwa/cadastrarMaquina.html',
  '/app_ajudante_pwa/calculoRetencao.html',
  '/app_ajudante_pwa/preFecho.html',
  '/app_ajudante_pwa/gerenciarClientes.html',
  '/app_ajudante_pwa/consultarCliente.html',
  '/app_ajudante_pwa/editarCliente.html',
  '/app_ajudante_pwa/excluirCliente.html',
  '/app_ajudante_pwa/icon-192.png',
  '/app_ajudante_pwa/icon-512.png',
  '/app_ajudante_pwa/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
];

self.addEventListener('install', event => {
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
