function renderizarCabecalho(tituloPagina = "") {
  const usuario = localStorage.getItem("usuario") || "";
  const cabecalho = document.createElement("div");
  cabecalho.className = "header";

  cabecalho.innerHTML = `
    <span class="logo">App Ajudante</span>
    <span class="usuario-logado">${usuario}</span>
    <button class="btn-sair" onclick="sair()"><i class="fas fa-sign-out-alt"></i> Sair</button>
  `;

  document.body.prepend(cabecalho);

  if (tituloPagina) {
    const titulo = document.createElement("h2");
    titulo.textContent = tituloPagina;
    titulo.style.marginTop = "0";
    titulo.style.color = "#4a148c";
    document.body.insertBefore(titulo, document.body.children[1]);
  }
}

function renderizarStatusConexao() {
  const online = navigator.onLine;
  const status = document.createElement("div");
  status.className = online ? "status-online" : "status-offline";
  status.innerText = online ? "🟢 Conectado" : "🔴 Offline";
  document.body.insertBefore(status, document.body.children[1]);
}

function protegerPagina() {
  const usuario = localStorage.getItem("usuario");
  if (!usuario) window.location.href = "login.html";
}

function sair() {
  localStorage.clear();
  window.location.href = "login.html";
}

function renderizarCabecalhoLogin() {
  const cabecalho = document.getElementById("cabecalho");
  cabecalho.innerHTML = `
    <div class="header">
      <span class="logo"><i class="fas fa-lock"></i> Login</span>
    </div>
  `;
}
