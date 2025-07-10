// Salva os dados no localStorage para sincronizar depois
function salvarLocalmente(acao, dados) {
  const pendentes = JSON.parse(localStorage.getItem("pendencias") || "[]");
  pendentes.push({ acao, dados });
  localStorage.setItem("pendencias", JSON.stringify(pendentes));
  console.log("🟡 Dados salvos localmente para sincronização:", acao);
}

// Tenta salvar online ou armazena localmente
async function salvarComSincronizacao(acao, dados) {
  if (navigator.onLine) {
    const resposta = await enviarDados(acao, dados);
    if (resposta.sucesso) {
      console.log("🟢 Dados enviados com sucesso:", acao);
      return resposta;
    } else {
      console.warn("⚠️ Erro ao enviar, salvando local:", resposta.mensagem);
      salvarLocalmente(acao, dados);
      return { sucesso: false, mensagem: "Salvo localmente. Tentaremos sincronizar depois." };
    }
  } else {
    salvarLocalmente(acao, dados);
    return { sucesso: false, mensagem: "Sem conexão. Salvo localmente." };
  }
}

// Tenta reenviar todos os dados pendentes do localStorage
async function sincronizarPendencias() {
  if (!navigator.onLine) return;

  const pendentes = JSON.parse(localStorage.getItem("pendencias") || "[]");
  if (pendentes.length === 0) return;

  console.log("🔁 Tentando sincronizar pendências...");

  const restantes = [];

  for (const item of pendentes) {
    const resposta = await enviarDados(item.acao, item.dados);
    if (!resposta.sucesso) {
      restantes.push(item); // Mantém se falhar
    }
  }

  localStorage.setItem("pendencias", JSON.stringify(restantes));
  if (restantes.length === 0) {
    console.log("✅ Todas as pendências foram sincronizadas.");
  } else {
    console.warn("⚠️ Algumas pendências não foram sincronizadas.");
  }
}

// Sempre que voltar conexão, tenta sincronizar
window.addEventListener("online", sincronizarPendencias);
