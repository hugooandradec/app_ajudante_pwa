import { logout, renderizarCabecalho, verificarConexao, logVisual } from './navegacao.js';

window.onload = () => {
  renderizarCabecalho();
  verificarConexao();
  logVisual('Pré-Fecho carregado ✅');

  document.getElementById('adicionar-maquina-btn').addEventListener('click', adicionarMaquina);
  document.getElementById('btnRelatorio').addEventListener('click', gerarRelatorio);
};

window.logout = logout;

function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function criarCampoMaquina() {
  const container = document.createElement('div');
  container.className = 'maquina';

  container.innerHTML = `
    <hr>
    <div class="campo-selo">
      <label>Selo da Máquina: </label>
      <input type="text" class="selo-input" placeholder="Digite o selo..." />
    </div>
    <div class="relogios">
      <div>
        <h4>Entrada Ant.</h4>
        <input type="number" class="entrada-anterior relogio" />
        <h4>Entrada Atual</h4>
        <input type="number" class="entrada-atual relogio" />
      </div>
      <div>
        <h4>Saída Ant.</h4>
        <input type="number" class="saida-anterior relogio" />
        <h4>Saída Atual</h4>
        <input type="number" class="saida-atual relogio" />
      </div>
    </div>
    <p class="resultado">Resultado: R$ 0,00</p>
  `;

  container.querySelectorAll('.relogio').forEach(input => {
    input.addEventListener('input', () => atualizarResultado(container));
  });

  return container;
}

function adicionarMaquina() {
  const container = document.getElementById('lista-maquinas');
  const novaMaquina = criarCampoMaquina();
  container.appendChild(novaMaquina);
}

function atualizarResultado(container) {
  const entradaAnt = parseInt(container.querySelector('.entrada-anterior').value) || 0;
  const entradaAtual = parseInt(container.querySelector('.entrada-atual').value);
  const saidaAnt = parseInt(container.querySelector('.saida-anterior').value) || 0;
  const saidaAtual = parseInt(container.querySelector('.saida-atual').value);

  if (isNaN(entradaAtual) || isNaN(saidaAtual)) return;

  const entrada = (entradaAtual - entradaAnt) / 100;
  const saida = (saidaAtual - saidaAnt) / 100;
  const resultado = entrada - saida;

  const resultadoElement = container.querySelector('.resultado');
  resultadoElement.textContent = `Resultado: ${formatarMoeda(resultado)}`;
  resultadoElement.style.color = resultado < 0 ? 'red' : 'green';

  atualizarTotalGeral();
}

function atualizarTotalGeral() {
  const resultados = document.querySelectorAll('.resultado');
  let total = 0;

  resultados.forEach(r => {
    const valorTexto = r.textContent.replace(/[^\d,-]/g, '').replace(',', '.');
    const valor = parseFloat(valorTexto);
    if (!isNaN(valor)) total += valor;
  });

  const totalGeralEl = document.getElementById('total-valor');
  totalGeralEl.textContent = `TOTAL: ${formatarMoeda(total)}`;
  totalGeralEl.style.color = total < 0 ? 'red' : 'green';
}

function gerarRelatorio() {
  const ponto = document.getElementById('nome-ponto').value.trim() || 'NÃO INFORMADO';
  const maquinas = document.querySelectorAll('.maquina');
  let texto = `Ponto: ${ponto}\n\n`;

  maquinas.forEach((maq, i) => {
    const selo = maq.querySelector('.selo-input')?.value?.trim() || '---';
    const entAnt = maq.querySelector('.entrada-anterior')?.value || '';
    const entAtu = maq.querySelector('.entrada-atual')?.value || '';
    const saiAnt = maq.querySelector('.saida-anterior')?.value || '';
    const saiAtu = maq.querySelector('.saida-atual')?.value || '';
    const resultadoTexto = maq.querySelector('.resultado')?.textContent?.split(':')[1]?.trim() || 'R$ 0,00';
    const cor = resultadoTexto.includes('-') ? 'red' : 'green';

    texto += `Selo: ${selo}\n`;
    texto += `Entrada: ${entAnt} → ${entAtu || '→'}\n`;
    texto += `Saída: ${saiAnt} → ${saiAtu || '→'}\n`;
    texto += `Resultado: ${resultadoTexto}\n\n`;
  });

  exibirPopupRelatorio(texto);
}

function exibirPopupRelatorio(conteudo) {
  const popup = document.createElement('div');
  popup.className = 'popup-relatorio';

  popup.innerHTML = `
    <div class="popup-conteudo">
      <h3>Relatório do Pré-Fecho</h3>
      <pre>${conteudo}</pre>
      <button onclick="document.body.removeChild(this.parentElement.parentElement)">Fechar</button>
    </div>
  `;

  Object.assign(popup.style, {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });

  document.body.appendChild(popup);
}

window.adicionarMaquina = adicionarMaquina;
window.gerarRelatorio = gerarRelatorio;