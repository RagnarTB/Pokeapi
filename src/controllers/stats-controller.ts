import { Request, Response } from "express";
import { StatsService } from "../service/stats.service";
const statsService = new StatsService();
// Estadísticas básicas (top Pokémon vistos)
export const getStats = async (req: Request, res: Response) => {
    try {
        const topPokemons = await statsService.getTopPokemons();
        res.json({
            success: true,
            topPokemons: topPokemons
        });
    } catch (error) {
        res.json({
            success: false,
            topPokemons: []
        });
    }
};
// Estadísticas por tipo
export const getStatsByType = async (req: Request, res: Response) => {
    try {
        const stats = await statsService.getStatsByType();
        res.json({
            success: true,
            stats: stats
        });
    } catch (error) {
        res.json({
            success: false,
            stats: []
        });
    }
};
// Pokémon más pesados
export const getHeaviestPokemons = async (req: Request, res: Response) => {
    try {
        const pokemons = await statsService.getHeaviestPokemons(5);
        res.json({
            success: true,
            pokemons: pokemons
        });
    } catch (error) {
        res.json({
            success: false,
            pokemons: []
        });
    }
};
// Pokémon más altos
export const getTallestPokemons = async (req: Request, res: Response) => {
    try {
        const pokemons = await statsService.getTallestPokemons(5);
        res.json({
            success: true,
            pokemons: pokemons
        });
    } catch (error) {
        res.json({
            success: false,
            pokemons: []
        });
    }
};
// Visitas por página
export const getVisitsByPage = async (req: Request, res: Response) => {
    try {
        const stats = await statsService.getVisitsByPage();
        res.json({
            success: true,
            stats: stats
        });
    } catch (error) {
        res.json({
            success: false,
            stats: []
        });
    }
};