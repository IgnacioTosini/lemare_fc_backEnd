import { Request, Response } from "express";
import { v2 as cloudinary } from 'cloudinary';

// Configurar Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteImageFromCloudinary = async (req: Request, res: Response): Promise<void> => {
    try {
        const { public_id } = req.body;

        if (!public_id) {
            res.status(400).json({ error: 'public_id is required' });
            return;
        }

        // Eliminar imagen de Cloudinary
        const result = await cloudinary.uploader.destroy(public_id);

        if (result.result === 'ok') {
            res.json({
                success: true,
                message: 'Image deleted successfully',
                public_id
            });
        } else {
            res.status(400).json({
                error: 'Failed to delete image from Cloudinary',
                details: result
            });
        }
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        res.status(500).json({
            error: 'Error deleting image from Cloudinary',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
