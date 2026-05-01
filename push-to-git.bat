@echo off
cd /d "C:\Users\DDL JUNIORATE\Desktop\Dar-Ark Byte"

echo === Resetting remote to use system credentials ===
git remote set-url origin https://github.com/DarArkByte/DARKBYTE.git

echo === Staging and committing fixes ===
git add .
git commit -m "fix: add SecurityTransportHub page and resolve duplicate import"

echo === Pushing ===
git push origin main

echo.
echo === Done! ===
pause
