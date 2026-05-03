@echo off
cd /d "C:\Users\DDL JUNIORATE\Desktop\Dar-Ark Byte"

echo [MASTER SYNC] Activating Portal & Login Engine...
git add .
git commit -m "fix: final portal stabilization and force-reload login repair"
git push origin main --force

echo.
echo === DONE! REFRESH AND LOGIN IN 45 SECONDS ===
pause
