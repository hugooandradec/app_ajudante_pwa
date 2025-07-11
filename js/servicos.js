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

export function limparCampos(ids = []) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}
