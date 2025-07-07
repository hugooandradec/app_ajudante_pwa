@echo off
echo Commitando e enviando para o GitHub...

git diff --quiet && git diff --cached --quiet
if %errorlevel%==0 (
    echo Nenhuma mudanca para enviar.
    pause
    exit /b
)

set /p commit_msg=Mensagem do commit: 

git add .
git commit -m "%commit_msg%"
git push origin main

echo Push finalizado com sucesso!
pause
