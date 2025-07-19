import { Router } from "express";
import { createPlayer, deletePlayer, getPlayerById, getPlayers, updatePlayerById, partialUpdatePlayerById } from "./handlers/player";
import { playerValidations, statsValidations } from "./middlewares/playerValidations";
import { handleInputErrors } from "./middlewares/globalValidator";
import { param, body } from "express-validator";
import { getStats, getStatsById, updatePlayerStats } from "./handlers/stats";
import { getTournamentTable, getMainTeamMatch, getAllMatches, createMatch, updateMatch, createTournamentTableEntry, updateTournamentTableEntry } from './handlers/tournament';
import { deleteImageFromCloudinary } from './handlers/cloudinary';

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

// Ruta para eliminar imágenes de Cloudinary
router.delete('/cloudinary/delete',
    body('public_id').notEmpty().withMessage('El public_id es requerido'),
    handleInputErrors,
    deleteImageFromCloudinary
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

router.get('/tournament/table', getTournamentTable);
router.get('/tournament/main-team-match', getMainTeamMatch);
router.get('/tournament/matches', getAllMatches);

router.post('/tournament/match',
    body('date').isISO8601().withMessage('La fecha debe ser válida (ISO8601)'),
    body('time').isString().withMessage('El tiempo debe ser una cadena de texto'),
    body('homeTeam').isString().withMessage('El equipo local debe ser una cadena de texto'),
    body('awayTeam').isString().withMessage('El equipo visitante debe ser una cadena de texto'),
    body('location').isString().withMessage('La ubicación debe ser una cadena de texto'),
    handleInputErrors,
    createMatch
);

router.put('/tournament/match/:id',
    param('id').isInt().withMessage('El id debe ser un número entero'),
    body('date').optional().isISO8601().withMessage('La fecha debe ser válida (ISO8601)'),
    body('time').optional().isString().withMessage('El tiempo debe ser una cadena de texto'),
    body('homeTeam').optional().isString().withMessage('El equipo local debe ser una cadena de texto'),
    body('awayTeam').optional().isString().withMessage('El equipo visitante debe ser una cadena de texto'),
    body('location').optional().isString().withMessage('La ubicación debe ser una cadena de texto'),
    handleInputErrors,
    updateMatch
);

router.post('/tournament/table-entry',
    body('position').isInt().withMessage('La posición debe ser un número entero'),
    body('teamName').isString().withMessage('El nombre del equipo debe ser una cadena de texto'),
    body('matchesPlayed').isInt().withMessage('Los partidos jugados deben ser un número entero'),
    body('goalsFor').isInt().withMessage('Los goles a favor deben ser un número entero'),
    body('goalsAgainst').isInt().withMessage('Los goles en contra deben ser un número entero'),
    body('goalDifference').isInt().withMessage('La diferencia de goles debe ser un número entero'),
    body('points').isInt().withMessage('Los puntos deben ser un número entero'),
    handleInputErrors,
    createTournamentTableEntry
);

router.put('/tournament/table-entry/:id',
    param('id').isInt().withMessage('El id debe ser un número entero'),
    body('position').optional().isInt().withMessage('La posición debe ser un número entero'),
    body('teamName').optional().isString().withMessage('El nombre del equipo debe ser una cadena de texto'),
    body('matchesPlayed').optional().isInt().withMessage('Los partidos jugados deben ser un número entero'),
    body('goalsFor').optional().isInt().withMessage('Los goles a favor deben ser un número entero'),
    body('goalsAgainst').optional().isInt().withMessage('Los goles en contra deben ser un número entero'),
    body('goalDifference').optional().isInt().withMessage('La diferencia de goles debe ser un número entero'),
    body('points').optional().isInt().withMessage('Los puntos deben ser un número entero'),
    handleInputErrors,
    updateTournamentTableEntry
);

export default router;