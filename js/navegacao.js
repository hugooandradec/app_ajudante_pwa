// ✅ Definir URL_BACKEND se não estiver no localStorage
if (!localStorage.getItem("URL_BACKEND")) {
  localStorage.setItem("URL_BACKEND", "https://ajudante-api.onrender.com");
}

// ✅ Garantir função logout disponível globalmente
window.logout = function logout() {
  localStorage.removeItem("usuario");
  window.location.href = "login.html";
};

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

// Força reload com versão local (Brasil) no formato ddMMyyyy-HHmm
(function forcarAtualizacaoDuranteDesenvolvimento() {
  const isDev = location.hostname.includes("github.io") || location.hostname === "localhost";
  if (!isDev) return;

  const dataBrasil = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
  const dia  = String(dataBrasil.getDate()).padStart(2, '0');
  const mes  = String(dataBrasil.getMonth() + 1).padStart(2, '0');
  const ano  = String(dataBrasil.getFullYear());
  const hora = String(dataBrasil.getHours()).padStart(2, '0');
  const min  = String(dataBrasil.getMinutes()).padStart(2, '0');
  const versao = `${dia}${mes}${ano}-${hora}${min}`;

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

// 🟡 Console visual só para Victor
(function ativarConsoleVisual() {
  const usuario = localStorage.getItem("usuarioLogado");
  if (usuario !== "victor") return;

  const div = document.createElement("div");
  div.id = "console-visual";
  div.style = `
    position:fixed;
    bottom:10px;
    left:10px;
    max-width:90%;
    max-height:40%;
    overflow:auto;
    background:#111;
    color:#0f0;
    font-family:monospace;
    font-size:12px;
    padding:10px;
    border:1px solid #444;
    border-radius:8px;
    z-index:9999;
    white-space:pre-wrap;
  `;

  const fechar = document.createElement("button");
  fechar.innerText = "✖";
  fechar.style = `
    position:absolute;
    top:4px;
    right:8px;
    background:none;
    border:none;
    color:#888;
    font-size:14px;
    cursor:pointer;
  `;
  fechar.onclick = () => div.remove();
  div.appendChild(fechar);
  document.body.appendChild(div);

  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;

  console.log = function (...args) {
    originalLog.apply(console, args);
    adicionarLinha("🟢 LOG", args);
  };
  console.error = function (...args) {
    originalError.apply(console, args);
    adicionarLinha("🔴 ERRO", args);
  };
  console.warn = function (...args) {
    originalWarn.apply(console, args);
    adicionarLinha("🟡 AVISO", args);
  };

  function adicionarLinha(tipo, args) {
    const linha = document.createElement("div");
    linha.textContent = `${tipo}: ${args.join(" ")}`;
    div.appendChild(linha);
    div.scrollTop = div.scrollHeight;
  }

  console.log("🟣 Console visual ativado.");
})();