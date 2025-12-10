export interface PokeAPIPageResponse {
    count: number;
    next: string;
    previous: string;
    results: Result[];
}

export interface Result {
    name: string;
    url: string;
}

export interface PokeAPIPokemonResponse {
    id: number;
    name: string;
    height: number;
    weight: number;
    abilities: { ability: { name: string } }[];
    types: { type: { name: string } }[];
    sprites: { front_default: string };
    stats: { stat: { name: string }, base_stat: number }[];
}
