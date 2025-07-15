import { enviarDados } from './servicos.js';

async function sincronizarPendencias() {
  if (!navigator.onLine) return;

  const pendentes = JSON.parse(localStorage.getItem("pendentes") || "[]");
  if (pendentes.length === 0) return;

  console.log("🔁 Tentando sincronizar pendências...");

  const restantes = [];

  for (const item of pendentes) {
    const resposta = await enviarDados(item.acao, item);
    if (!resposta.sucesso) {
      restantes.push(item); // Mantém se falhar
    }
  }

  localStorage.setItem("pendentes", JSON.stringify(restantes));
  if (restantes.length === 0) {
    console.log("✅ Todas as pendências foram sincronizadas.");
  } else {
    console.warn("⚠️ Algumas pendências não foram sincronizadas.");
  }
}

window.addEventListener("online", sincronizarPendencias);
window.addEventListener("load", sincronizarPendencias);