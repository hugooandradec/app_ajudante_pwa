const CACHE_NAME = 'ajudante-cache-v' + Date.now();

// Última atualização: 2025-07-16 23:40

const urlsToCache = [
  '/ajudante-app/',
  '/ajudante-app/index.html',
  '/ajudante-app/login.html',
  '/ajudante-app/menu.html',
  '/ajudante-app/gerenciarClientes.html',
  '/ajudante-app/gerenciarMaquinas.html',
  '/ajudante-app/cadastrarCliente.html',
  '/ajudante-app/editarCliente.html',
  '/ajudante-app/consultarCliente.html',
  '/ajudante-app/excluirCliente.html',
  '/ajudante-app/cadastrarMaquina.html',
  '/ajudante-app/editarMaquina.html',
  '/ajudante-app/consultarMaquina.html',
  '/ajudante-app/excluirMaquina.html',
  '/ajudante-app/preFecho.html',
  '/ajudante-app/calculoRetencao.html',
  '/ajudante-app/manifest.json',
  '/ajudante-app/favicon.ico',
  '/ajudante-app/icon-192.png',
  '/ajudante-app/icon-512.png',

  // Font Awesome
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

// ✅ Lógica inteligente: network-first para .js e .html, cache-first para o resto
self.addEventListener('fetch', event => {
  const { request } = event;

  const isHTMLorJS =
    request.destination === 'document' || request.destination === 'script' ||
    request.url.endsWith('.html') || request.url.endsWith('.js');

  if (isHTMLorJS) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request))
    );
  } else {
    event.respondWith(
      caches.match(request).then(response => response || fetch(request))
    );
  }
});
