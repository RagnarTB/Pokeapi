
import { Request, Response } from "express";
import { findAllPokemons } from "../services/pokeapi-service";

export const getAllPokemons = async (req: Request, res: Response) => {
    const page: number = Number(req.query.page) || 1;

    const pokemons = await findAllPokemons(page);

    res.json(pokemons);
};
