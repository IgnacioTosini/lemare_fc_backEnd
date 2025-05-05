import { check } from "express-validator";

export const playerValidations = [
    check('name').notEmpty().withMessage('Name es requerido'),
    check('image').notEmpty().withMessage('Image es requerido'),
    check('number').notEmpty().withMessage('Number es requerido'),
    check('year').notEmpty().withMessage('Year es requerido'),
    check('age').notEmpty().withMessage('Age es requerido'),
    check('country').notEmpty().withMessage('Country es requerido'),
    check('height').notEmpty().withMessage('Height es requerido'),
    check('position').notEmpty().withMessage('Position es requerido'),
    check('description').optional().isString().withMessage('Description debe ser un string'),
];

export const statsValidations = [
    check('goals').isInt({ min: 0 }).withMessage('Goals debe ser un número entero no negativo'),
    check('assists').isInt({ min: 0 }).withMessage('Assists debe ser un número entero no negativo'),
    check('matchesPlayed').isInt({ min: 0 }).withMessage('MatchesPlayed debe ser un número entero no negativo'),
    check('yellowCards').isInt({ min: 0 }).withMessage('YellowCards debe ser un número entero no negativo'),
    check('redCards').isInt({ min: 0 }).withMessage('RedCards debe ser un número entero no negativo'),
];