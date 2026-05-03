@echo off
cd /d "C:\Users\DDL JUNIORATE\Desktop\Dar-Ark Byte"

echo [FORCE REVEAL] Activating Nuclear Portal Repair...
git add .
git commit -m "fix: nuclear rebuild with manual force-entry override"
git push origin main --force

echo.
echo === DONE! REFRESH AND LOGIN IN 45 SECONDS ===
echo === CLICK 'FORCE ENTRY NOW' ON SCREEN IF STUCK ===
pause
