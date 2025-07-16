import { logout, atualizarStatusConexao, exibirUsuario } from './navegacao.js';
import { salvarComSincronizacao, obterSelosDisponiveis } from './servicos.js';

console.log("🚀 Script cadastrarCliente.js carregado");

window.addEventListener("load", async () => {
  console.log("🟣 DOM totalmente carregado");

  window.logout = logout;
  atualizarStatusConexao();
  exibirUsuario();

  let selosDisponiveis = [];
  let maquinasSelecionadas = [];

  selosDisponiveis = await obterSelosDisponiveis();

  window.abrirPopupMaquinas = function () {
    document.getElementById("popupMaquinas").style.display = "flex";
    document.getElementById("buscaMaquina").value = "";
    filtrarSelos();
  };

  window.fecharPopup = function () {
    document.getElementById("popupMaquinas").style.display = "none";
  }

  window.filtrarSelos = function () {
    const termo = document.getElementById("buscaMaquina").value.toLowerCase();
    const filtrados = selosDisponiveis.filter(s => s.toLowerCase().includes(termo));
    const lista = document.getElementById("listaSelos");
    lista.innerHTML = "";
    filtrados.forEach(selo => {
      const item = document.createElement("div");
      item.textContent = selo;
      item.onclick = () => selecionarMaquina(selo);
      lista.appendChild(item);
    });
  };

  function selecionarMaquina(selo) {
    if (!maquinasSelecionadas.includes(selo)) {
      maquinasSelecionadas.push(selo);
      atualizarMaquinasSelecionadas();
    }
    fecharPopup();
  }

  function atualizarMaquinasSelecionadas() {
    const container = document.getElementById("maquinasSelecionadas");
    container.innerHTML = "";
    maquinasSelecionadas.forEach(selo => {
      const tag = document.createElement("div");
      tag.className = "selo-tag";
      tag.innerHTML = `${selo} <span class="remover-selo" onclick="removerMaquina('${selo}')">&times;</span>`;
      container.appendChild(tag);
    });
  }

  window.removerMaquina = function (selo) {
    maquinasSelecionadas = maquinasSelecionadas.filter(m => m !== selo);
    atualizarMaquinasSelecionadas();
  };

  function capitalizarPalavras(texto) {
    return texto.replace(/\b\w+/g, palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase());
  }

  window.salvarCliente = async function () {
    console.log("🖱️ salvarCliente() FOI CHAMADO!");

    const nomeInput = document.getElementById("nome");
    const enderecoInput = document.getElementById("endereco");
    const rotaInput = document.getElementById("rota");

    console.log("📋 Campos:", { nomeInput, enderecoInput, rotaInput });

    const nome = capitalizarPalavras(nomeInput?.value.trim() || "");
    const endereco = capitalizarPalavras(enderecoInput?.value.trim() || "");
    const rota = capitalizarPalavras(rotaInput?.value.trim() || "");

    console.log("✏️ Valores:", { nome, endereco, rota });

    if (!nome || !endereco || !rota) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const cliente = {
      nome,
      endereco,
      rota,
      maquinas: maquinasSelecionadas
    };

    console.log("✅ Cliente a enviar:", cliente);

    const resp = await salvarComSincronizacao("cadastrarCliente", cliente);
    if (resp.sucesso) {
      alert("Cliente salvo!");
      nomeInput.value = "";
      enderecoInput.value = "";
      rotaInput.value = "";
      maquinasSelecionadas = [];
      atualizarMaquinasSelecionadas();
    } else {
      alert(resp.mensagem || "Erro ao salvar.");
    }
  };
});
