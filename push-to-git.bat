@echo off
cd /d "C:\Users\DDL JUNIORATE\Desktop\Dar-Ark Byte"

git remote set-url origin https://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@github.com/DarArkByte/DARKBYTE.git

git add .
git commit -m "fix: add missing SecurityTransportHub page and resolve duplicate import"
git push

echo.
echo === Done! Vercel will auto-redeploy ===
pause
