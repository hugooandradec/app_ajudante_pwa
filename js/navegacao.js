// Atualiza o ícone de status
export function atualizarStatusConexao() {
  const icone = document.getElementById("icone-status");
  if (icone) {
    icone.style.color = navigator.onLine ? "green" : "red";
  }
}

// Exibe o nome do usuário logado
export function exibirUsuario() {
  const usuario = localStorage.getItem("usuarioLogado") || "Desconhecido";
  const span = document.getElementById("usuario-logado");
  if (span) {
    span.innerText = usuario;
  }
}

// Logout do usuário
export function logout() {
  localStorage.removeItem("usuarioLogado");
  window.location.href = "login.html";
}

// Monitoramento automático de status de conexão
export function monitorarStatusConexao() {
  window.addEventListener("online", atualizarStatusConexao);
  window.addEventListener("offline", atualizarStatusConexao);
  atualizarStatusConexao();
}

// Renderiza o cabeçalho padrão em páginas que utilizam <div id="cabecalho"></div>
export function renderizarCabecalho(titulo = "") {
  const usuario = localStorage.getItem("usuarioLogado") || "Usuário";
  const cabecalho = document.getElementById("cabecalho");
  if (!cabecalho) return;

  cabecalho.innerHTML = `
    <header style="background-color: #6a1b9a; color: white; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center; font-size: 16px; font-weight: bold;">
        <i class="fas fa-arrow-left" style="margin-right: 8px; cursor: pointer;" onclick="window.history.back()"></i>
        ${titulo}
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <i class="fas fa-circle status-icon" id="icone-status" style="color: gray; font-size: 14px;"></i>
        <span class="usuario" id="usuario-logado">${usuario}</span>
        <button onclick="logout()" title="Sair" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer;">
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </header>
  `;

  atualizarStatusConexao();
}

// Inicializa uma página com cabeçalho automático (caso queira usar em massa)
export function inicializarPagina(titulo = "") {
  renderizarCabecalho(titulo);
  monitorarStatusConexao();
  exibirUsuario();
  window.logout = logout;
}
