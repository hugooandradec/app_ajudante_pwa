// URL do backend
export const URL_BACKEND = "https://ajudante-api.onrender.com";

// Envia uma ação e dados ao backend, retorna resposta JSON
export async function enviarDados(acao, dados = {}) {
  try {
    const resposta = await fetch(URL_BACKEND, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ acao, ...dados })
    });

    if (!resposta.ok) throw new Error("Erro na resposta da API");
    return await resposta.json();
  } catch (erro) {
    console.error("Erro em enviarDados:", erro);
    return { sucesso: false, mensagem: "Erro de conexão com o servidor." };
  }
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

// Valida se todos os campos estão preenchidos
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

// Limpa os campos informados
export function limparCampos(ids = []) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

// 🔄 Salva dados com sincronização offline
export async function salvarComSincronizacao(acao, dados) {
  const payload = { acao, ...dados };

  if (navigator.onLine) {
    try {
      const resposta = await enviarDados(acao, dados);
      if (resposta.sucesso) return;
    } catch (e) {
      console.warn("Erro ao tentar salvar online, salvando local...");
    }
  }

  const pendentes = JSON.parse(localStorage.getItem("pendentes") || "[]");
  pendentes.push(payload);
  localStorage.setItem("pendentes", JSON.stringify(pendentes));
}

// 🔄 Busca os selos já cadastrados (com cache offline)
export async function obterSelosDisponiveis() {
  if (navigator.onLine) {
    try {
      const resposta = await enviarDados("listarSelos");
      if (resposta.sucesso && resposta.selos) {
        localStorage.setItem("selosCache", JSON.stringify(resposta.selos));
        return resposta.selos;
      }
    } catch (e) {
      console.warn("Erro ao buscar selos online, usando cache...");
    }
  }

  return JSON.parse(localStorage.getItem("selosCache") || "[]");
}