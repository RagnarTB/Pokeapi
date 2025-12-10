import express, { Express } from 'express';
import cors from 'cors';
import router from './routes/stats.route';

const app: Express = express();
// Puerto fijo 3001 para comunicación interna
const PORT = 3001;

// CORS para permitir comunicación entre servicios
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Usar las rutas de la API
app.use(router);

app.listen(PORT, () => {
    console.log(`✅ Stats Service activo en http://localhost:${PORT}`);
    console.log(`📊 Endpoints:`);
    console.log(`   - http://localhost:${PORT}/api/stats`);
    console.log(`   - http://localhost:${PORT}/api/stats/by-type`);
    console.log(`   - http://localhost:${PORT}/api/stats/heaviest`);
});
