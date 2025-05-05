import { Response } from "express";
import Stats from "../models/Stats.model";

export const findStatsById = async (id: string) => {
    const stats = await Stats.findByPk(id);
    if (!stats) {
        throw new Error('Stats not found');
    }
    return stats;
};

export const handleStatsError = (res: Response, error: unknown, message: string) => {
    console.error(message, error);
    res.status(500).json({
        error: message,
        details: error instanceof Error ? error.message : 'Unknown error',
    });
};

export const updateStats = async (playerId: string, statsData: any) => {
    const stats = await Stats.findOne({ where: { playerId } });
    if (!stats) {
        throw new Error('Stats not found for the given player');
    }
    await stats.update(statsData);
    return stats;
};