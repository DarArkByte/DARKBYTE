@echo off
cd /d "C:\Users\DDL JUNIORATE\Desktop\Dar-Ark Byte"

echo.
echo === DAR-ARK BYTE - Git Diagnostics ===
echo.

echo --- Current Remotes ---
git remote -v
echo.

echo --- Staging all files ---
git add .

echo --- Committing ---
git commit -m "feat: Dar-Ark Byte school management platform" 2>&1

echo.
echo --- Pushing with upstream ---
git push --set-upstream origin main 2>&1

echo.
echo === DONE. Check above for any errors. ===
echo.
pause
