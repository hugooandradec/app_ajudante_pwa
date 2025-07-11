// Atualiza o status visual
function atualizar(status) {
  const div = document.getElementById("statusConexao");
  if (div) {
    div.className = status ? "status-online" : "status-offline";
    div.textContent = status ? "Conectado" : "Desconectado";
  }
}

// Cria o elemento do status, se ainda não existir
export function monitorarStatusConexao() {
  let status = document.getElementById("statusConexao");
  if (!status) {
    status = document.createElement("div");
    status.id = "statusConexao";
    document.querySelector("footer")?.appendChild(status);
  }

  function checar() {
    atualizar(navigator.onLine);
  }

  window.addEventListener("online", checar);
  window.addEventListener("offline", checar);
  checar();
}

// Cabeçalho padrão
export function renderizarCabecalho(titulo) {
  const cabecalho = document.getElementById("cabecalho");
  if (cabecalho) {
    cabecalho.innerHTML = `
      <div></div>
      <div class="logo">${titulo}</div>
      <div class="usuario-logado">
        <i class="fas fa-user"></i> ${localStorage.getItem("usuario") || ""}
        <i class="fas fa-sign-out-alt" onclick="logout()" title="Sair"></i>
      </div>
    `;
  }
}

// Inicializa a página
export function inicializarPagina(titulo) {
  renderizarCabecalho(titulo);
}

// Define a função logout globalmente
window.logout = function () {
  localStorage.clear();
  window.location.href = "login.html";
};