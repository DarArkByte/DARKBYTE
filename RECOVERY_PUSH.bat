@echo off
cd /d "C:\Users\DDL JUNIORATE\Desktop\Dar-Ark Byte"

echo [FINAL ADMISSION] Deploying Login Optimization...
git add .
git commit -m "fix: restore login interaction and remove animation freeze"
git push origin main --force

echo.
echo === DONE! REFRESH AND LOGIN IN 45 SECONDS ===
pause
