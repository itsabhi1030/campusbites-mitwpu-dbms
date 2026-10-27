@echo off
echo ===================================================
echo   Compiling CampusBites C++ Algorithmic Engine...
echo ===================================================
g++ -std=c++17 -O2 -Wall main.cpp -o campusbites_engine.exe
if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] Compilation succeeded! Created campusbites_engine.exe
    echo.
    echo Running automated unit tests...
    campusbites_engine.exe --test
) else (
    echo [ERROR] Compilation failed!
)
pause
