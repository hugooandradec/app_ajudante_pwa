// Atualiza o ícone de status (verde/vermelho)
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

// Renderiza o cabeçalho padrão dentro de <div id="cabecalho"></div>
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

// Inicializa uma página com cabeçalho, status e logout
export function inicializarPagina(titulo = "") {
  renderizarCabecalho(titulo);
  monitorarStatusConexao();
  exibirUsuario();
  window.logout = logout;
}

// 💡 TRUQUE DE DESENVOLVIMENTO: Força atualização com ?v=TIMESTAMP no formato ddMMyyyy-HHmm (Brasil)
(function forcarAtualizacaoDuranteDesenvolvimento() {
  const isDev = location.hostname.includes("github.io") || location.hostname === "localhost";
  if (!isDev) return;

  const dataBrasil = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
  const dia = String(dataBrasil.getDate()).padStart(2, '0');
  const mes = String(dataBrasil.getMonth() + 1).padStart(2, '0');
  const ano = String(dataBrasil.getFullYear());
  const hora = String(dataBrasil.getHours()).padStart(2, '0');
  const min = String(dataBrasil.getMinutes()).padStart(2, '0');
  const versao = `${dia}${mes}${ano}-${hora}${min}`; // Ex: 16072025-0013

  const urlAtual = new URL(window.location.href);
  if (!urlAtual.searchParams.has("v")) {
    urlAtual.searchParams.set("v", versao);
    window.location.replace(urlAtual.toString());
    return;
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
      const href = link.getAttribute("href");
      if (!href.includes("?v=")) {
        const novaUrl = new URL(link.href);
        novaUrl.searchParams.set("v", versao);
        link.href = novaUrl.toString();
      }
    });

    document.querySelectorAll('script[type="module"]').forEach(script => {
      const src = script.getAttribute("src");
      if (src && !src.includes("?v=") && src.endsWith(".js")) {
        const novaUrl = new URL(src, window.location.origin);
        novaUrl.searchParams.set("v", versao);
        script.src = novaUrl.toString();
      }
    });
  });
})();
