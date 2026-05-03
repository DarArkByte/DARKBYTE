@echo off
cd /d "C:\Users\DDL JUNIORATE\Desktop\Dar-Ark Byte"

echo [CINEMATIC UPDATE] Deploying Landing Page Animations...
git add .
git commit -m "feat: cinematic landing page animations and video-gradient hero"
git push origin main --force

echo.
echo === DONE! REFRESH IN 45 SECONDS ===
pause
