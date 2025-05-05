import { Router } from "express";
import { createPlayer, deletePlayer, getPlayerById, getPlayers, updatePlayerById, partialUpdatePlayerById } from "./handlers/player";
import { playerValidations, statsValidations } from "./middlewares/playerValidations";
import { handleInputErrors } from "./middlewares/globalValidator";
import { param } from "express-validator";
import { getStats, getStatsById, updatePlayerStats } from "./handlers/stats";
"./middlewares/playerValidations";

const router = Router();

router.get('/jugadores', getPlayers);

router.get('/jugadores/:id',
    param('id').isInt().withMessage('El id debe ser un número entero'),
    handleInputErrors,
    getPlayerById
);

router.post('/jugadores',
    playerValidations,
    handleInputErrors,
    createPlayer
);

router.put('/jugadores/:id',
    param('id').isInt().withMessage('El id debe ser un número entero'),
    playerValidations,
    handleInputErrors,
    updatePlayerById
);

router.patch('/jugadores/:id',
    param('id').isInt().withMessage('El id debe ser un número entero'),
    handleInputErrors,
    partialUpdatePlayerById
);

router.delete('/jugadores/:id',
    param('id').isInt().withMessage('El id debe ser un número entero'),
    handleInputErrors,
    deletePlayer
);

router.get('/stats', getStats);

router.get('/jugadores/:id/stats',
    param('id').isInt().withMessage('El id debe ser un número entero'),
    handleInputErrors,
    getStatsById
);

router.patch('/jugadores/:id/stats',
    param('id').isInt().withMessage('El id debe ser un número entero'),
    statsValidations,
    handleInputErrors,
    updatePlayerStats
);

export default router;