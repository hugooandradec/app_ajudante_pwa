import { salvarComSincronizacao } from "./sincronizador.js";
import { capitalizarNome, capitalizarTexto, exibirMensagem } from "./servicos.js";

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

// Função de popup de adição de máquinas (temporária)
function abrirPopupMaquinas() {
  const selo = prompt("Digite o selo da máquina:");
  if (selo) {
    const li = document.createElement("li");
    li.textContent = selo.toUpperCase();
    document.getElementById("maquinasSelecionadas")?.appendChild(li);
  }
}

// Expor funções globalmente para uso em eventos inline
window.abrirPopupMaquinas = abrirPopupMaquinas;

window.salvarCliente = () => {
  const form = document.getElementById("formCliente");
  if (form) form.requestSubmit();
};
