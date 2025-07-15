const CACHE_NAME = 'ajudante-cache-v' + Date.now();

// Última atualização: 2025-07-15 03:24

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

  // JS internos
  '/ajudante-app/js/navegacao.js',
  '/ajudante-app/js/componentes.js',
  '/ajudante-app/js/servicos.js',
  '/ajudante-app/js/sincronizador.js',

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

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});