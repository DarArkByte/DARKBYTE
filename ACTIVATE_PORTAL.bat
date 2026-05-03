@echo off
cd /d "C:\Users\DDL JUNIORATE\Desktop\Dar-Ark Byte"

echo [DEEP SYNC] Activating Functional Command Center...
git add .
git commit -m "fix: final portal stabilization and login repair"
git push origin main --force

echo.
echo === DONE! REFRESH YOUR BROWSER IN 45 SECONDS ===
pause
