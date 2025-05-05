import { Response } from "express";
import Player from "../models/Player.model";
import SocialMedia from "../models/SocialMedia.model";

export const findPlayerById = async (id: string) => {
    const player = await Player.findByPk(id);
    if (!player) {
        throw new Error(`Player with ID ${id} not found`);
    }
    return player;
};

export const handleError = (res: Response, error: unknown, message: string) => {
    console.error(message, error);
    res.status(500).json({
        error: message,
        details: error instanceof Error ? error.message : 'Unknown error',
    });
};

export const updateSocialMedia = async (playerId: string, socialMedia: any[]) => {
    for (const media of socialMedia) {
        if (media.id) {
            // Actualizar una red social existente
            await SocialMedia.update(media, {
                where: { id: media.id, playerId },
            });
        } else {
            // Crear una nueva red social
            await SocialMedia.create({ ...media, playerId });
        }
    }
};