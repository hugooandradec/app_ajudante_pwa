@echo off
echo =============================
echo Iniciando servidor local no Brave...
echo =============================

:: Caminho até a pasta do frontend
cd /d C:\github\ajudante_pwa

:: Caminho padrão do Brave
set "BRAVE_PATH=C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe"

:: Abrir Brave na URL local
start "" "%BRAVE_PATH%" http://localhost:5500

:: Iniciar o servidor local na porta 5500
npx serve -l 5500

pause
