@echo off
setlocal

cd /d "%~dp0"

echo Checking Node.js and npm...
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed or not in PATH.
  echo Please install Node.js first: https://nodejs.org/
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo npm is not installed or not in PATH.
  echo Please install Node.js first: https://nodejs.org/
  pause
  exit /b 1
)

if not exist node_modules (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo npm install failed.
    pause
    exit /b 1
  )
)

echo Building website...
call npm run build
if errorlevel 1 (
  echo Build failed.
  pause
  exit /b 1
)

echo.
echo Build complete. The dist folder has been generated.
pause
