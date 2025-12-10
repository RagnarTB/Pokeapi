import express from 'express';
import { getAllPokemons } from '../controllers/pokemon-controller';

const router = express.Router();

// Ruta para obtener Pokémon
router.get('/api/pokemons', getAllPokemons);

export default router;
