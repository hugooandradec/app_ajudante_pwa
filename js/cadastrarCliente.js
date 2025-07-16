import { logout, atualizarStatusConexao, exibirUsuario } from './navegacao.js';
import { salvarComSincronizacao, obterSelosDisponiveis } from './servicos.js';

window.addEventListener("load", async () => {
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
    const nome = capitalizarPalavras(document.getElementById("nome")?.value.trim() || "");
    const endereco = capitalizarPalavras(document.getElementById("endereco")?.value.trim() || "");
    const rota = capitalizarPalavras(document.getElementById("rota")?.value.trim() || "");

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

    const resp = await salvarComSincronizacao("cadastrarCliente", cliente);
    if (resp.sucesso) {
      alert("Cliente salvo!");
      document.getElementById("nome").value = "";
      document.getElementById("endereco").value = "";
      document.getElementById("rota").value = "";
      maquinasSelecionadas = [];
      atualizarMaquinasSelecionadas();
    } else {
      alert(resp.mensagem || "Erro ao salvar.");
    }
  };
});
