// URL do backend
export const URL_BACKEND = "https://ajudante-api.onrender.com";

// Envia uma ação e dados ao backend, retorna resposta JSON
export async function enviarDados(acao, dados = {}) {
  try {
    const payload = { acao, dados };
    console.log("🔍 Enviando para API:", JSON.stringify(payload, null, 2)); // 🟣 debug

    const resposta = await fetch(URL_BACKEND, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload) // ✅ estrutura correta
    });

    if (!resposta.ok) throw new Error("Erro na resposta da API");
    return await resposta.json();
  } catch (erro) {
    console.error("Erro em enviarDados:", erro);
    return { sucesso: false, mensagem: "Erro de conexão com o servidor." };
  }
}

// Salva os dados com fallback para localStorage em caso de falha
export async function salvarComSincronizacao(acao, dados) {
  if (navigator.onLine) {
    try {
      const resposta = await enviarDados(acao, dados);
      if (resposta.sucesso) return { sucesso: true };
      return { sucesso: false, mensagem: resposta.mensagem };
    } catch (erro) {
      console.warn("Erro ao enviar online:", erro);
    }
  }

  const pendentes = JSON.parse(localStorage.getItem("pendentes") || "[]");
  pendentes.push({ acao, dados }); // ✅ estrutura correta
  localStorage.setItem("pendentes", JSON.stringify(pendentes));

  return { sucesso: false, mensagem: "Salvo localmente. Será sincronizado depois." };
}

// Exibe mensagem em um elemento com id="mensagem"
export function exibirMensagem(texto, tipo = 'erro') {
  const msg = document.getElementById("mensagem");
  if (!msg) return;

  msg.className = tipo;
  msg.textContent = texto;

  setTimeout(() => {
    msg.textContent = '';
    msg.className = '';
  }, 4000);
}

// Validação de campos obrigatórios
export function validarCamposObrigatorios(ids = []) {
  for (const id of ids) {
    const valor = document.getElementById(id)?.value.trim();
    if (!valor) {
      exibirMensagem(`Preencha o campo: ${id}`, "erro");
      return false;
    }
  }
  return true;
}

// Limpa campos
export function limparCampos(ids = []) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

// Obtém selos disponíveis via backend
export async function obterSelosDisponiveis() {
  try {
    const resposta = await enviarDados("listarSelos");
    if (resposta.sucesso && Array.isArray(resposta.selos)) {
      return resposta.selos;
    }
  } catch (e) {
    console.warn("Erro ao obter selos:", e);
  }
  return [];
}
