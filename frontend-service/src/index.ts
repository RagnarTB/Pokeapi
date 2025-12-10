import express, { Express } from 'express';
import path from 'path';

const app: Express = express();
const PORT = process.env.PORT || 3002;

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, '../public')));

// Ruta principal que muestra el HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
    console.log(`✅ Frontend Service activo en http://localhost:${PORT}`);
    console.log(`🎨 Interfaz: http://localhost:${PORT}/`);
    console.log(`📡 Conectando a:`);
    console.log(`   - Pokemon Service: http://localhost:3000`);
    console.log(`   - Stats Service: http://localhost:3001`);
});
