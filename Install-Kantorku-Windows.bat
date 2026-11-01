@echo off
setlocal
title KantorKu - Instalasi Windows

cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\Install-Kantorku-Windows.ps1"

if errorlevel 1 (
  echo.
  echo Instalasi atau peluncuran KantorKu gagal.
  pause
)
