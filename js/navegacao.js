const URL_BACKEND = "https://ajudante-api.onrender.com";

// ⬆️ Exportar a URL central do backend para todas as páginas

function usuarioLogado() {
  return localStorage.getItem("usuarioLogado");
}

function realizarLogout() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "login.html";
}

// ⬇️ Cabeçalho com usuário logado e botão sair
function renderizarCabecalho(titulo = '') {
  const usuario = usuarioLogado() || "Usuário";

  const cabecalhoHTML = `
    <div class="cabecalho">
      <div class="usuario-info">
        <span><i class="fas fa-user"></i> ${usuario}</span>
        <button class="btn-sair" onclick="realizarLogout()">
          <i class="fas fa-sign-out-alt"></i> Sair
        </button>
      </div>
      ${titulo ? `<h1 class="titulo">${titulo}</h1>` : ''}
    </div>
  `;

  document.body.insertAdjacentHTML("afterbegin", cabecalhoHTML);
}

// ⬇️ Detecta se está online
function estaOnline() {
  return navigator.onLine;
}
