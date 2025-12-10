@echo off
echo ========================================
echo  Iniciando Microservicios de Pokemon
echo ========================================
echo.

echo [1/4] Verificando MongoDB...
echo Por favor, asegurate que MongoDB este corriendo en otra terminal
echo Comando: mongod --dbpath ./data/db
echo.
pause

echo [2/4] Iniciando Pokemon Service (Puerto 3000)...
start cmd /k "cd pokemon-service && npm run dev"
timeout /t 3

echo [3/4] Iniciando Stats Service (Puerto 3001)...
start cmd /k "cd stats-service && npm run dev"
timeout /t 3

echo [4/4] Iniciando Frontend Service (Puerto 3002)...
start cmd /k "cd frontend-service && npm run dev"
timeout /t 3

echo.
echo ========================================
echo  Todos los servicios iniciados!
echo ========================================
echo.
echo  Pokemon Service:  http://localhost:3000
echo  Stats Service:    http://localhost:3001
echo  Frontend:         http://localhost:3002
echo.
echo Abriendo navegador...
timeout /t 2
start http://localhost:3002

echo.
echo Presiona cualquier tecla para salir...
pause >nul
