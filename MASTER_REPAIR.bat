@echo off
cd /d "C:\Users\DDL JUNIORATE\Desktop\Dar-Ark Byte"

echo [RESTORATION] Bringing back the beautiful landing page...
git add .
git commit -m "fix: restore original landing page design with precision animations"
git push origin main --force

echo.
echo === DONE! YOUR BEAUTIFUL PAGE IS BACK ===
pause
