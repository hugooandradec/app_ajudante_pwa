import { enviarDados } from './servicos.js';

async function sincronizarPendencias() {
  if (!navigator.onLine) return;

  const pendentes = JSON.parse(localStorage.getItem("pendentes") || "[]");
  if (pendentes.length === 0) return;

  console.log("🔁 Tentando sincronizar pendências...");

  const restantes = [];

  for (const item of pendentes) {
    const { acao, dados } = item; // ✅ acessa corretamente
    const resposta = await enviarDados(acao, dados);
    if (!resposta.sucesso) {
      restantes.push(item); // mantém se falhar
    }
  }

  localStorage.setItem("pendentes", JSON.stringify(restantes));
  if (restantes.length === 0) {
    console.log("✅ Todas as pendências foram sincronizadas.");
  } else {
    console.warn("⚠️ Algumas pendências não foram sincronizadas.");
  }
}

// Sincroniza quando volta a conexão ou ao carregar a página
window.addEventListener("online", sincronizarPendencias);
window.addEventListener("load", sincronizarPendencias);
