import express from 'express';
import { getAllPokemons } from '../controllers/pokemon-controller';
import {
    getStats,
    getStatsByType,
    getHeaviestPokemons,
    getTallestPokemons,
    getVisitsByPage
} from '../controllers/stats-controller';
const router = express.Router();
// Ruta para obtener Pokémon
router.get('/pokemons', getAllPokemons);
// Rutas de estadísticas
router.get('/stats', getStats);
router.get('/stats/by-type', getStatsByType);
router.get('/stats/heaviest', getHeaviestPokemons);
router.get('/stats/tallest', getTallestPokemons);
router.get('/stats/by-page', getVisitsByPage);
export default router;