const URL_BACKEND = "https://ajudante-api.onrender.com";

// ⬆️ URL do backend centralizado

function usuarioLogado() {
  return localStorage.getItem("usuarioLogado");
}

function realizarLogout() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "login.html";
}

// ⬇️ Cabeçalho com faixa roxa + nome do sistema + usuário + botão sair
function renderizarCabecalho(titulo = '') {
  const usuario = usuarioLogado() || "Usuário";

  const cabecalhoHTML = `
    <div class="cabecalho-superior">
      <h2 class="titulo-sistema"><i class="fas fa-tools"></i> Ajudante App</h2>
    </div>
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

function estaOnline() {
  return navigator.onLine;
}
