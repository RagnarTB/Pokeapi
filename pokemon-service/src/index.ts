import express, { Express } from 'express';
import cors from 'cors';
import router from './routes/pokemon.route';

const app: Express = express();
const PORT = process.env.PORT || 3000;

// CORS para permitir comunicación entre servicios
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Usar las rutas de la API
app.use(router);

app.listen(PORT, () => {
    console.log(`✅ Pokemon Service activo en http://localhost:${PORT}`);
    console.log(`📦 Endpoint: http://localhost:${PORT}/api/pokemons?page=1`);
});
