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

  const conteudo = document.getElementById("conteudo-relatorio");
  conteudo.innerHTML = `<strong>Relatório do Pré-Fecho</strong><br><br><b>Ponto:</b> ${ponto}<br><br>`;

  let totalFinal = 0;

  maquinas.forEach((div) => {
    const selo = div.querySelector(".selo").value || "—";
    const eAnt = div.querySelector(".entrada-ant").value || "→";
    const eAtu = div.querySelector(".entrada-atual").value || "→";
    const sAnt = div.querySelector(".saida-ant").value || "→";
    const sAtu = div.querySelector(".saida-atual").value || "→";

    const eAntVal = parseInt(eAnt) || 0;
    const eAtuVal = parseInt(eAtu) || 0;
    const sAntVal = parseInt(sAnt) || 0;
    const sAtuVal = parseInt(sAtu) || 0;
    const temAtuais = eAtu !== "→" || sAtu !== "→";

    let resultado = 0;
    if (temAtuais) {
      resultado = ((eAtuVal - eAntVal) - (sAtuVal - sAntVal)) / 100;
      totalFinal += resultado;
    }

    const cor = resultado < 0 ? "red" : "green";
    const valorFormatado = formatar(resultado);

    conteudo.innerHTML += `
      <b>Selo:</b> ${selo}<br>
      Entrada: ${eAnt} → ${eAtu}<br>
      Saída: ${sAnt} → ${sAtu}<br>
      Resultado: <span style="color:${cor}">${valorFormatado}</span><br><br>
    `;
  });

  const corTotal = totalFinal < 0 ? "red" : "green";
  const valorTotalFormatado = formatar(totalFinal);

  conteudo.innerHTML += `<b>TOTAL:</b> <span style="color:${corTotal}">${valorTotalFormatado}</span>`;

  document.getElementById("modal-relatorio").style.display = "flex";
};

window.fecharRelatorio = function () {
  document.getElementById("modal-relatorio").style.display = "none";
};
