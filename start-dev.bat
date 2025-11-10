@echo off
echo Starting ResumeForge Development Servers...
echo.
echo Opening Terminal 1: Backend Server...
start cmd /k "cd /d %~dp0server && echo Starting Backend... && npm start"

timeout /t 3 /nobreak >nul

echo Opening Terminal 2: Frontend Client...
start cmd /k "cd /d %~dp0client && echo Starting Frontend... && npm run dev"

echo.
echo ✅ Both servers are starting!
echo.
echo Backend will run on: http://localhost:3001
echo Frontend will open at: http://localhost:5173
echo.
echo Press any key to exit this window...
pause >nul
