import axios from "axios";
import { PokeAPIPageResponse, PokeAPIPokemonResponse } from "../types";
import { PokemonResponse } from "../entities/pokemon";
import { StatsService } from "./stats.service";
const POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon";
const statsService = new StatsService();
export const findAllPokemons = async (page = 1): Promise<PokemonResponse[]> => {
    try {
        const offset = (page - 1) * 20;
        // 1. Obtener la lista de nombres y URLs
        const { data } = await axios.get<PokeAPIPageResponse>(
            `${POKEAPI_URL}?offset=${offset}&limit=20`
        );

        const pokemons = await Promise.all(
            data.results.map(async (pokemon) => {
                const pokemonFound = await findPokemon(pokemon.url);

                // GUARDAR POKÉMON COMPLETO EN CACHÉ
                await statsService.savePokemon({
                    name: pokemonFound.name,
                    pokedexId: pokemonFound.id,
                    height: pokemonFound.height,
                    weight: pokemonFound.weight,
                    types: pokemonFound.types.map(t => t.type.name),
                    abilities: pokemonFound.abilities.map(a => a.ability.name),
                    image: pokemonFound.sprites.front_default,
                    stats: extractStats(pokemonFound)
                });

                // GUARDAR VISITA CON NÚMERO DE PÁGINA
                await statsService.saveVisit(pokemonFound.name, page);

                return toPokemonResponse(pokemonFound);
            })
        );
        return pokemons;
    } catch (error) {
        console.log(error);
        return [];
    }
};
// Obtener detalles de un Pokémon específico
const findPokemon = async (url: string) => {
    const { data } = await axios.get<PokeAPIPokemonResponse>(url);
    return data;
};
// Extraer stats del Pokémon
const extractStats = (pokeapi: PokeAPIPokemonResponse) => {
    const statsMap: any = {};
    pokeapi.stats.forEach(stat => {
        const statName = stat.stat.name
            .replace('special-attack', 'specialAttack')
            .replace('special-defense', 'specialDefense');
        statsMap[statName] = stat.base_stat;
    });
    return statsMap;
};
// Convertir la respuesta de PokeAPI al formato de nuestra app
const toPokemonResponse = (pokeapi: PokeAPIPokemonResponse): PokemonResponse => {
    return {
        name: pokeapi.name,
        height: pokeapi.height,
        weight: pokeapi.weight,
        abilities: pokeapi.abilities.map(a => a.ability.name),
        types: pokeapi.types.map(t => t.type.name),
        image: pokeapi.sprites.front_default
    };
};