import express, { Express } from 'express';
import router from './routes/pokemon.route';

const app: Express = express();
const PORT = process.env.PORT || 3000;
// SERVIR ARCHIVOS ESTÁTICOS (NUEVO)
app.use(express.static('public'));

// Middleware para parsear JSON (útil para futuras extensiones)
app.use(express.json());

// Ruta principal que muestra el HTML
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './public' });
});

// Usar las rutas de la API
app.use(router);

app.listen(PORT, () => {
    console.log(`✅ Servidor activo en http://localhost:${PORT}`);
    console.log(`📊 MongoDB: Las visitas se guardarán en pokemonDB`);
    console.log(`📁 Interfaz: http://localhost:${PORT}/`);
});