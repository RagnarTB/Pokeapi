import axios from "axios";
import { PokeAPIPageResponse, PokeAPIPokemonResponse } from "../types";
import { PokemonResponse } from "../entities/pokemon";

const POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon";

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
