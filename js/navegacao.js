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

function renderizarStatusConexao() {
  const statusDiv = document.createElement("div");
  statusDiv.id = "status-conexao";
  statusDiv.style.position = "fixed";
  statusDiv.style.top = "0";
  statusDiv.style.left = "0";
  statusDiv.style.right = "0";
  statusDiv.style.padding = "5px";
  statusDiv.style.textAlign = "center";
  statusDiv.style.zIndex = "9999";
  statusDiv.style.fontSize = "0.9rem";
  statusDiv.style.fontWeight = "bold";
  statusDiv.style.color = "white";

  document.body.appendChild(statusDiv);

  function atualizarStatus() {
    if (navigator.onLine) {
      statusDiv.textContent = "🟢 Conectado";
      statusDiv.style.backgroundColor = "#28a745";
    } else {
      statusDiv.textContent = "🔴 Sem conexão - dados serão sincronizados depois";
      statusDiv.style.backgroundColor = "#dc3545";
    }
  }

  window.addEventListener("online", atualizarStatus);
  window.addEventListener("offline", atualizarStatus);
  atualizarStatus(); // inicial
}

function protegerPagina() {
  if (!localStorage.getItem("usuarioLogado")) {
    location.href = "login.html";
  }
}
