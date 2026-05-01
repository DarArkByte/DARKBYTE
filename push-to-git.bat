@echo off
cd /d "C:\Users\DDL JUNIORATE\Desktop\Dar-Ark Byte"

echo.
echo === DAR-ARK BYTE — Git Push ===
echo.

git add .
echo [1/3] Staged all changes.

git commit -m "feat: Dar-Ark Byte — school management platform update"
echo [2/3] Committed.

git push
echo [3/3] Pushed to remote!

echo.
echo Done! Press any key to close.
pause
