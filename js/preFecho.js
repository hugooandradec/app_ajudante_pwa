import { inicializarPagina } from "./navegacao.js";
window.inicializarPagina = inicializarPagina;

inicializarPagina("Pré-Fecho");

window.adicionarMaquina = function () {
  const container = document.getElementById("maquinas");
  const div = document.createElement("div");
  div.innerHTML = `
    <hr/>
    <label>Selo da Máquina:</label>
    <input type="text" class="selo" placeholder="Digite o selo..." />
    <div class="linha-relatorios">
      <div style="flex:1">
        <div><b style="color:purple">Entrada Ant.</b></div>
        <input type="number" class="entrada-ant" />
        <div><b style="color:purple">Entrada Atual</b></div>
        <input type="number" class="entrada-atual" />
      </div>
      <div style="flex:1">
        <div><b style="color:purple">Saída Ant.</b></div>
        <input type="number" class="saida-ant" />
        <div><b style="color:purple">Saída Atual</b></div>
        <input type="number" class="saida-atual" />
      </div>
    </div>
    <div class="resultado">Resultado: R$ 0,00</div>
  `;
  container.appendChild(div);

  // Adiciona evento de cálculo automático
  div.querySelectorAll("input").forEach((input) =>
    input.addEventListener("input", atualizarResultados)
  );
};

function atualizarResultados() {
  const maquinas = document.querySelectorAll("#maquinas > div");
  let total = 0;

  maquinas.forEach((div) => {
    const eAnt = parseInt(div.querySelector(".entrada-ant").value || 0);
    const eAtu = parseInt(div.querySelector(".entrada-atual").value || 0);
    const sAnt = parseInt(div.querySelector(".saida-ant").value || 0);
    const sAtu = parseInt(div.querySelector(".saida-atual").value || 0);
    const resultadoEl = div.querySelector(".resultado");

    const temAtuais = div.querySelector(".entrada-atual").value || div.querySelector(".saida-atual").value;

    let valor = 0;
    if (temAtuais) {
      valor = ((eAtu - eAnt) - (sAtu - sAnt)) / 100;
    }

    total += valor;

    resultadoEl.innerText = `Resultado: ${formatar(valor)}`;
    resultadoEl.className = "resultado " + (valor < 0 ? "negativo" : "positivo");
  });

  const totalEl = document.getElementById("total");
  totalEl.innerText = `TOTAL: ${formatar(total)}`;
  totalEl.className = "resultado " + (total < 0 ? "negativo" : "positivo");
}

function formatar(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

window.visualizarRelatorio = function () {
  const ponto = document.getElementById("ponto").value || "—";
  const maquinas = document.querySelectorAll("#maquinas > div");
  let texto = `Ponto: ${ponto}\n\n`;

  maquinas.forEach((div, i) => {
    const selo = div.querySelector(".selo").value || "—";
    const eAnt = div.querySelector(".entrada-ant").value || "→";
    const eAtu = div.querySelector(".entrada-atual").value || "→";
    const sAnt = div.querySelector(".saida-ant").value || "→";
    const sAtu = div.querySelector(".saida-atual").value || "→";
    const resultadoTexto = div.querySelector(".resultado").innerText.split(":")[1].trim();

    texto += `Selo: ${selo}\n`;
    texto += `Entrada: ${eAnt} → ${eAtu}\n`;
    texto += `Saída:   ${sAnt} → ${sAtu}\n`;
    texto += `Resultado: ${resultadoTexto}\n\n`;
  });

  document.getElementById("conteudo-relatorio").innerText = texto;
  document.getElementById("modal-relatorio").style.display = "flex";
};
