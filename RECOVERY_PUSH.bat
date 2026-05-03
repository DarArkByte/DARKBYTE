@echo off
cd /d "C:\Users\DDL JUNIORATE\Desktop\Dar-Ark Byte"

echo [SYSTEM RECOVERY] Deploying Final Portal Fixes...
git add .
git commit -m "fix: emergency portal recovery and routing stabilization"
git push origin main --force

echo.
echo === DONE! REFRESH YOUR BROWSER IN 45 SECONDS ===
pause
