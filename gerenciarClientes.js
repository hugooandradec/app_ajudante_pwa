import { inicializarPagina } from './navegacao.js';
import { enviarDados, salvarComSincronizacao, exibirMensagem } from './servicos.js';

inicializarPagina("Gerenciar Clientes");

let clienteEncontrado = null;

// Capitalização automática
function capitalizarTexto(texto) {
  return texto
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, l => l.toUpperCase());
}

// Busca cliente ao digitar
document.getElementById("nome").addEventListener("blur", async () => {
  const nome = capitalizarTexto(document.getElementById("nome").value.trim());
  if (!nome) return;

  const resposta = await enviarDados("buscarCliente", { nome });
  const cliente = resposta?.dados;

  if (cliente) {
    clienteEncontrado = cliente;
    preencherCampos(cliente);
    mostrarModo("editar");
  } else {
    clienteEncontrado = null;
    limparCampos(false);
    mostrarModo("cadastrar");
  }
});

function preencherCampos(cliente) {
  document.getElementById("nome").value = cliente.nome || "";
  document.getElementById("endereco").value = cliente.endereco || "";
  document.getElementById("rota").value = cliente.rota || "";
  // aqui você pode preencher máquinas se desejar no futuro
}

function limparCampos(limparNome = true) {
  if (limparNome) document.getElementById("nome").value = "";
  document.getElementById("endereco").value = "";
  document.getElementById("rota").value = "";
  document.getElementById("maquinasSelecionadas").innerHTML = "";
}

function mostrarModo(modo) {
  const btnSalvar = document.getElementById("btnSalvar");
  const btnExcluir = document.getElementById("btnExcluir");

  if (modo === "editar") {
    btnSalvar.innerText = "Salvar Alterações";
    btnSalvar.style.display = "inline-block";
    btnExcluir.style.display = "inline-block";
  } else if (modo === "cadastrar") {
    btnSalvar.innerText = "Cadastrar Cliente";
    btnSalvar.style.display = "inline-block";
    btnExcluir.style.display = "none";
  }
}

// Salvar (cadastrar ou editar)
document.getElementById("formCliente").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = capitalizarTexto(document.getElementById("nome").value.trim());
  const endereco = capitalizarTexto(document.getElementById("endereco").value.trim());
  const rota = capitalizarTexto(document.getElementById("rota").value.trim());

  const maquinas = Array.from(document.querySelectorAll("#maquinasSelecionadas li")).map(li => li.textContent);

  if (!nome || !endereco || !rota) {
    return exibirMensagem("Preencha todos os campos obrigatórios.", false);
  }

  const acao = clienteEncontrado ? "editarCliente" : "cadastrarCliente";

  const dados = { nome, endereco, rota, maquinas };

  const sucesso = await salvarComSincronizacao(acao, dados);

  if (sucesso) {
    exibirMensagem(clienteEncontrado ? "Cliente atualizado!" : "Cliente cadastrado!", true);
    limparCampos();
    clienteEncontrado = null;
    mostrarModo("cadastrar");
  }
});

// Excluir cliente
document.getElementById("btnExcluir").addEventListener("click", async () => {
  if (!clienteEncontrado) return;

  const confirmar = confirm(`Deseja realmente excluir o cliente "${clienteEncontrado.nome}"?`);
  if (!confirmar) return;

  const sucesso = await enviarDados("excluirCliente", { nome: clienteEncontrado.nome });

  if (sucesso?.sucesso) {
    exibirMensagem("Cliente excluído com sucesso.", true);
    limparCampos();
    clienteEncontrado = null;
    mostrarModo("cadastrar");
  } else {
    exibirMensagem("Erro ao excluir cliente.", false);
  }
});
