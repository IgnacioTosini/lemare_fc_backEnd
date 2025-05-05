import { Request, Response } from "express";
import Player from "../models/Player.model";
import Stats from "../models/Stats.model";
import SocialMedia from "../models/SocialMedia.model";
import db from "../config/db";
import { findPlayerById, handleError, updateSocialMedia } from "../utils/playerUtils";

export const getPlayers = async (req: Request, res: Response) => {
    try {
        const players = await Player.findAll({
            include: [Stats, SocialMedia]
        });
        res.json({ data: players });
    } catch (error) {
        console.error("Error fetching players:", error);
        res.status(500).json({ error: 'Error fetching players', details: error instanceof Error ? error.message : 'Unknown error' });
    }
}

export const getPlayerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const player = await Player.findByPk(id, {
            include: [Stats, SocialMedia]
        });
        if (!player) {
            res.status(404).json({ error: 'Player not found' });
            return;
        }
        res.json({ data: player });
    } catch (error) {
        console.error("Error fetching player:", error);
        res.status(500).json({ error: 'Error fetching player', details: error instanceof Error ? error.message : 'Unknown error' });
    }
}

export const createPlayer = async (req: Request, res: Response) => {
    const transaction = await db.transaction();

    try {
        const { stats, socialMedia, ...playerData } = req.body;

        // Asegurar que el nombre esté completamente normalizado
        const normalizedPlayerName = playerData.name.trim().toLowerCase().replace(/\s+/g, ' ');
        const existingPlayer = await Player.findOne({ where: { name: normalizedPlayerName } });

        if (existingPlayer) {
            console.log("Jugador existente encontrado en la base de datos:", existingPlayer.name);
            res.status(400).json({ error: 'El nombre del jugador ya existe en la base de datos.' });
            return;
        }

        // Normalizar el nombre antes de la inserción
        playerData.name = normalizedPlayerName;

        // Crear el jugador primero
        const player = await Player.create(playerData, { transaction });

        // Crear las estadísticas asociadas después de crear el jugador
        if (stats) {
            const statsData = { ...stats, playerId: player.id };
            const createdStats = await Stats.create(statsData, { transaction });

            // Actualizar el statsId en el jugador
            await player.update({ statsId: createdStats.id }, { transaction });
        }

        // Crear las redes sociales asociadas
        if (socialMedia && Array.isArray(socialMedia)) {
            const socialMediaInstances = socialMedia.map((media) => ({
                ...media,
                playerId: player.id,
            }));
            await SocialMedia.bulkCreate(socialMediaInstances, { transaction });
        }

        await transaction.commit();
        res.json({ data: player });
    } catch (error) {
        await transaction.rollback();
        // Log detallado del error para depuración
        console.error("Error al crear el jugador:", error);
        if (error instanceof Error && error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ error: 'El nombre del jugador ya existe en la base de datos.' });
        } else {
            res.status(500).json({ error: 'Error creando el jugador', details: error instanceof Error ? error.message : 'Unknown error' });
        }
    }
};

export const updatePlayerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const player = await Player.findByPk(id);
    if (!player) {
        res.status(404).json({ error: 'Player not found' });
        return;
    }
    try {
        const { stats, socialMedia, ...playerData } = req.body;

        // Actualizar el jugador
        await player.update(playerData);

        // Actualizar las estadísticas asociadas
        if (stats) {
            await Stats.update(stats, {
                where: { playerId: id },
            });
        }

        // Actualizar las redes sociales asociadas
        if (socialMedia && Array.isArray(socialMedia)) {
            await SocialMedia.destroy({
                where: { playerId: id },
            });
            const socialMediaInstances = socialMedia.map((media) => ({
                ...media,
                playerId: id,
            }));
            await SocialMedia.bulkCreate(socialMediaInstances);
        }

        // Enviar respuesta al cliente
        res.json({ message: 'Player updated successfully', data: player });
    } catch (error) {
        console.error("Error updating player:", error);
        res.status(500).json({ error: 'Error updating player', details: error instanceof Error ? error.message : 'Unknown error' });
    }
};

export const partialUpdatePlayerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const player = await findPlayerById(id);
        const { stats, socialMedia, ...playerData } = req.body;

        // Actualizar solo los campos proporcionados del jugador
        if (Object.keys(playerData).length > 0) {
            await player.update(playerData);
        }

        // Actualizar las estadísticas asociadas si se proporcionan
        if (stats) {
            await Stats.update(stats, {
                where: { playerId: id },
            });
        }

        // Actualizar las redes sociales asociadas de manera incremental
        if (socialMedia && Array.isArray(socialMedia)) {
            await updateSocialMedia(id, socialMedia);
        }

        res.json({ message: 'Player updated successfully' });
    } catch (error) {
        handleError(res, error, 'Error updating player');
    }
};

export const deletePlayer = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const player = await findPlayerById(id);
        if (!player) {
            res.status(404).json({ error: `Player with ID ${id} not found` });
            return;
        }

        // Eliminar estadísticas asociadas
        await Stats.destroy({ where: { playerId: id } });

        // Eliminar redes sociales asociadas
        await SocialMedia.destroy({ where: { playerId: id } });

        // Eliminar el jugador
        await player.destroy();

        res.json({ message: 'Player deleted successfully' });
    } catch (error) {
        handleError(res, error, `Error deleting player with ID ${id}`);
    }
};

