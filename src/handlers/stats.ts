import { Request, Response } from "express";
import Stats from "../models/Stats.model";
import { findStatsById, handleStatsError, updateStats } from "../utils/statsUtils";

export const getStats = async (req: Request, res: Response) => {
    try {
        const stats = await Stats.findAll();
        res.json({ data: stats });
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ error: 'Error fetching stats', details: error instanceof Error ? error.message : 'Unknown error' });
    }
}

export const getStatsById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const stats = await findStatsById(id);
        res.json({ data: stats });
    } catch (error) {
        handleStatsError(res, error, "Error fetching stats");
    }
};

export const updatePlayerStats = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { stats } = req.body;

    try {
        const updatedStats = await updateStats(id, stats);
        res.json({ data: updatedStats });
    } catch (error) {
        handleStatsError(res, error, "Error updating player stats");
    }
};