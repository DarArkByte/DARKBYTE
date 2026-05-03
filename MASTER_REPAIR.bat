@echo off
cd /d "C:\Users\DDL JUNIORATE\Desktop\Dar-Ark Byte"

echo [NUCLEAR REPAIR] Deploying Manual Overrides...
git add .
git commit -m "fix: nuclear rebuild with force entry overrides"
git push origin main --force

echo.
echo === DONE! REFRESH AND LOGIN IN 45 SECONDS ===
echo === IF STUCK, CLICK 'FORCE ENTRY NOW' ON SCREEN ===
pause
