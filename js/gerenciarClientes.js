import { salvarComSincronizacao } from "./sincronizador.js";
import {
  capitalizarNome,
  capitalizarTexto,
  exibirMensagem,
  enviarDados
} from "./servicos.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formCliente");
  const btnExcluir = document.getElementById("btnExcluir");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nome = capitalizarNome(document.getElementById("nome")?.value || "").trim();
      const endereco = capitalizarTexto(document.getElementById("endereco")?.value || "").trim();
      const rota = capitalizarTexto(document.getElementById("rota")?.value || "").trim();

      if (!nome || !endereco || !rota) {
        exibirMensagem("Preencha todos os campos obrigatórios.", "erro");
        return;
      }

      const maquinasSelecionadas = Array.from(document.querySelectorAll("#maquinasSelecionadas li")).map(li => li.textContent.trim());

      const cliente = {
        nome,
        endereco,
        rota,
        maquinas: maquinasSelecionadas,
      };

      await salvarComSincronizacao("cadastrarCliente", cliente);
      form.reset();
      document.getElementById("maquinasSelecionadas").innerHTML = "";
    });
  }

  if (btnExcluir) {
    btnExcluir.addEventListener("click", () => {
      exibirMensagem("Função de exclusão ainda não implementada.", "info");
    });
  }
});

// 🔍 Buscar cliente por nome
window.buscarCliente = async () => {
  const nomeBuscado = document.getElementById("buscaCliente").value.trim();
  const mensagem = document.getElementById("mensagem");
  const resultado = document.getElementById("resultadoCliente");
  const dadosDiv = document.getElementById("dadosCliente");

  if (!nomeBuscado) {
    exibirMensagem("Digite o nome do cliente para buscar.", "erro");
    return;
  }

  mensagem.style.display = "none";
  resultado.style.display = "none";
  dadosDiv.innerHTML = "";

  try {
    const resposta = await enviarDados("consultarCliente", { nome: nomeBuscado });

    if (!resposta || !resposta.nome) {
      mensagem.textContent = "Cliente não encontrado. Deseja cadastrá-lo?";
      mensagem.style.display = "block";
      return;
    }

    // Cliente encontrado
    const { nome, endereco, rota, maquinas } = resposta;

    dadosDiv.innerHTML = `
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>Endereço:</strong> ${endereco}</p>
      <p><strong>Rota:</strong> ${rota}</p>
      <p><strong>Máquinas:</strong> ${maquinas?.join(", ") || "Nenhuma"}</p>
    `;

    resultado.style.display = "block";
  } catch (erro) {
    console.error("Erro ao buscar cliente:", erro);
    exibirMensagem("Erro ao buscar cliente. Tente novamente.", "erro");
  }
};

// 🛠️ Editar cliente (esqueleto)
window.editarCliente = () => {
  exibirMensagem("Função de edição ainda será implementada.", "info");
};

// 🗑️ Excluir cliente (esqueleto)
window.excluirCliente = () => {
  exibirMensagem("Função de exclusão ainda será implementada.", "info");
};

// Popup temporário para adicionar máquina (opcional)
window.abrirPopupMaquinas = () => {
  const selo = prompt("Digite o selo da máquina:");
  if (selo) {
    const li = document.createElement("li");
    li.textContent = selo.toUpperCase();
    document.getElementById("maquinasSelecionadas")?.appendChild(li);
  }
};

// Enviar programaticamente o formulário, se necessário
window.salvarCliente = () => {
  const form = document.getElementById("formCliente");
  if (form) form.requestSubmit();
};