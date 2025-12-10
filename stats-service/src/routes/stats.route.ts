import express from 'express';
import {
    getStats,
    getStatsByType,
    getHeaviestPokemons,
    getTallestPokemons,
    getVisitsByPage,
    saveVisit
} from '../controllers/stats-controller';

const router = express.Router();

// Rutas de estadísticas
router.get('/api/stats', getStats);
router.get('/api/stats/by-type', getStatsByType);
router.get('/api/stats/heaviest', getHeaviestPokemons);
router.get('/api/stats/tallest', getTallestPokemons);
router.get('/api/stats/by-page', getVisitsByPage);

// Ruta para guardar visitas
router.post('/api/stats/visit', saveVisit);

export default router;
