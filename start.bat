@echo off
setlocal

:: ============================================================
::  MindBridge - AI Sign Language Interpreter
::  Starts the Flask backend and the Vite/React frontend
:: ============================================================

set "ROOT=%~dp0"
set "BACKEND=%ROOT%backend"
set "FRONTEND=%ROOT%frontend"

echo ============================================
echo   Starting MindBridge (AI Sign Lang Interpreter)
echo ============================================
echo.

:: --- Backend: Flask API on http://127.0.0.1:5000 ---
if not exist "%BACKEND%\venv\Scripts\python.exe" (
    echo [ERROR] Backend virtual environment not found at:
    echo   %BACKEND%\venv
    echo.
    echo Create it first, e.g. from the backend folder run:
    echo   python -m venv venv
    echo   venv\Scripts\pip install flask flask-cors opencv-python cvzone mediapipe joblib numpy scikit-learn pandas
    echo.
    pause
    exit /b 1
)

echo Checking backend dependencies...
"%BACKEND%\venv\Scripts\python.exe" -c "import flask, flask_cors" 2>nul
if errorlevel 1 (
    echo [INFO] Missing packages detected - installing them now...
    "%BACKEND%\venv\Scripts\python.exe" -m pip install flask flask-cors opencv-python opencv-contrib-python cvzone mediapipe joblib numpy scikit-learn scipy pandas matplotlib pillow sounddevice
    if errorlevel 1 (
        echo [ERROR] Dependency install failed. Fix the error above and re-run start.bat.
        pause
        exit /b 1
    )
)

echo [1/2] Launching backend on http://127.0.0.1:5000 ...
start "MindBridge Backend" cmd /k "cd /d "%BACKEND%" && venv\Scripts\python.exe app.py"

:: --- Frontend: Vite dev server on http://localhost:5173 ---
if not exist "%FRONTEND%\node_modules" (
    echo [INFO] node_modules not found - installing frontend dependencies...
    pushd "%FRONTEND%"
    call npm install
    popd
)

echo [2/2] Launching frontend on http://localhost:5173 ...
start "MindBridge Frontend" cmd /k "cd /d "%FRONTEND%" && npm run dev"

:: --- Give servers a moment to boot, then open the app in the browser ---
timeout /t 5 /nobreak >nul
start "" "http://localhost:5173"

echo.
echo ============================================
echo   Backend  : http://127.0.0.1:5000
echo   Frontend : http://localhost:5173
echo   Two new windows opened for the servers.
echo   Close those windows to stop MindBridge.
echo ============================================

endlocal