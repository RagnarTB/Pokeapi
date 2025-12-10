const { spawn } = require('child_process');

console.log('🚀 Iniciando todos los servicios...');

// Iniciar Pokemon Service
const pokemonService = spawn('node', ['pokemon-service/dist/index.js'], {
    stdio: 'inherit',
    shell: true
});

// Iniciar Stats Service
const statsService = spawn('node', ['stats-service/dist/index.js'], {
    stdio: 'inherit',
    shell: true
});

// Iniciar Frontend Service
const frontendService = spawn('node', ['frontend-service/dist/index.js'], {
    stdio: 'inherit',
    shell: true
});

// Manejar errores
pokemonService.on('error', (err) => console.error('Error en Pokemon Service:', err));
statsService.on('error', (err) => console.error('Error en Stats Service:', err));
frontendService.on('error', (err) => console.error('Error en Frontend Service:', err));

// Manejar cierre
process.on('SIGINT', () => {
    console.log('\n🛑 Deteniendo servicios...');
    pokemonService.kill();
    statsService.kill();
    frontendService.kill();
    process.exit();
});
