// Arquivo: navegacao.js

// URL do backend (Apps Script publicado como Web App)
const URL_BASE = "https://script.google.com/macros/s/AKfycbxTIUjGSzKkqGd90hOkyQvKCb1mPM1mdsOLdZTvheKj7MzWxF56ve5Gvmlc-v2GjF7C/exec";

// Funções genéricas de navegação
function irPara(pagina) {
  window.location.href = `${pagina}.html`;
}
