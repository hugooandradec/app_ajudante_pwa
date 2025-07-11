export const URL_BACKEND = "https://ajudante-api.onrender.com/";

export function verificarLogin() {
  const user = localStorage.getItem("usuario");
  if (!user) {
    window.location.href = "login.html";
  }
}

export function protegerPagina() {
  const nomePagina = window.location.pathname;
  if (!localStorage.getItem("usuario") && !nomePagina.includes("login")) {
    window.location.href = "login.html";
  }
}

export function sair() {
  localStorage.removeItem("usuario");
  window.location.href = "login.html";
}

export function inicializarPagina(titulo) {
  if (titulo?.toLowerCase() === "login") {
    renderizarCabecalhoSimples(titulo);
  } else {
    protegerPagina();
    renderizarCabecalho(titulo);
  }
  renderizarStatusConexao();
  monitorarStatusConexao();
}

export function renderizarCabecalho(tituloPagina = "") {
  const cabecalho = document.createElement("div");
  cabecalho.className = "header";

  const user = localStorage.getItem("usuario") || "";
  cabecalho.innerHTML = `
    <span class="logo">${tituloPagina}</span>
    <span class="usuario-logado">
      <i class="fas fa-user"></i> ${user}
      <button onclick="sair()" title="Sair"><i class="fas fa-sign-out-alt"></i></button>
    </span>
  `;

  document.body.prepend(cabecalho);
}

export function renderizarCabecalhoSimples(tituloPagina = "") {
  const cabecalho = document.createElement("div");
  cabecalho.className = "header";

  cabecalho.innerHTML = `
    <span class="logo"><i class="fas fa-lock"></i> ${tituloPagina}</span>
  `;

  document.body.prepend(cabecalho);
}

export function exibirUsuarioLogado() {
  const usuario = localStorage.getItem("usuario");
  if (usuario) {
    const span = document.getElementById("usuarioLogado");
    if (span) span.innerText = usuario;
  }
}

export function renderizarStatusConexao() {
  const status = document.createElement("div");
  status.id = "statusConexao";
  status.className = "status-online";
  status.innerText = "Conectado";

  const footer = document.querySelector("footer") || document.body;
  footer.appendChild(status);
}

export function monitorarStatusConexao() {
  const status = document.getElementById("statusConexao");
  function atualizar() {
    const online = navigator.onLine;
    status.className = online ? "status-online" : "status-offline";
    status.innerText = online ? "Conectado" : "Offline";
  }
  window.addEventListener("online", atualizar);
  window.addEventListener("offline", atualizar);
  atualizar();
}
