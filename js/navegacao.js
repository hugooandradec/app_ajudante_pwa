// 🌐 URL do backend atual hospedado no Render
export const URL_BACKEND = "https://ajudante-api.onrender.com";

// 🔁 Navegação programada para uma página específica (ex: irPara('index'))
export function irPara(pagina) {
  window.location.href = `${pagina}.html`;
}

// 🔐 Verifica se o usuário está logado
// Se não estiver, redireciona para a tela de login
export function verificarLogin() {
  const usuario = localStorage.getItem('usuarioLogado');
  if (!usuario) {
    window.location.href = 'login.html';
  }
}

// 👤 Exibe o nome do usuário logado no elemento com id="usuario-logado"
// (Usado no cabeçalho das páginas protegidas)
export function exibirUsuarioLogado() {
  const usuario = localStorage.getItem('usuarioLogado');
  if (usuario && document.getElementById('usuario-logado')) {
    document.getElementById('usuario-logado').textContent = `Usuário: ${usuario}`;
  }
}

// 🚪 Realiza logout:
// Remove o usuário logado do localStorage e redireciona para login
export function sair() {
  localStorage.removeItem('usuarioLogado');
  window.location.href = 'login.html';
}
