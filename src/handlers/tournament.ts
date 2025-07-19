import { Request, Response } from 'express';
import { Match, TournamentTableEntry } from '../models/Tournament.model';

export const getTournamentTable = async (req: Request, res: Response) => {
    try {
        const table = await TournamentTableEntry.findAll({ order: [['position', 'ASC']] });
        res.status(200).json(table);
    } catch (error) {
        console.error('Error fetching tournament table:', error);
        res.status(500).json({ message: 'Error fetching tournament table' });
    }
};

export const getMainTeamMatch = async (req: Request, res: Response) => {
    try {
        const match = await Match.findOne({ where: { homeTeam: 'Lemare FC' }, order: [['date', 'ASC']] });
        res.status(200).json(match);
    } catch (error) {
        console.error('Error fetching main team match:', error);
        res.status(500).json({ message: 'Error fetching main team match' });
    }
};

export const getAllMatches = async (req: Request, res: Response) => {
    try {
        const matches = await Match.findAll({ order: [['date', 'ASC']] });
        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching matches:', error);
        res.status(500).json({ message: 'Error fetching matches' });
    }
};

export const createMatch = async (req: Request, res: Response) => {
    try {
        const match = await Match.create(req.body);
        res.status(201).json(match);
    } catch (error) {
        console.error('Error creating match:', error);
        res.status(500).json({ message: 'Error creating match' });
    }
};

export const updateMatch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [updated] = await Match.update(req.body, { where: { id } });
        if (updated) {
            const updatedMatch = await Match.findByPk(id);
            res.status(200).json(updatedMatch);
        } else {
            res.status(404).json({ message: 'Match not found' });
        }
    } catch (error) {
        console.error('Error updating match:', error);
        res.status(500).json({ message: 'Error updating match' });
    }
};

export const createTournamentTableEntry = async (req: Request, res: Response) => {
    try {
        const entry = await TournamentTableEntry.create(req.body);
        res.status(201).json(entry);
    } catch (error) {
        console.error('Error creating tournament table entry:', error);
        res.status(500).json({ message: 'Error creating tournament table entry' });
    }
};

export const updateTournamentTableEntry = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [updated] = await TournamentTableEntry.update(req.body, { where: { id } });
        if (updated) {
            const updatedEntry = await TournamentTableEntry.findByPk(id);
            res.status(200).json(updatedEntry);
        } else {
            res.status(404).json({ message: 'Tournament table entry not found' });
        }
    } catch (error) {
        console.error('Error updating tournament table entry:', error);
        res.status(500).json({ message: 'Error updating tournament table entry' });
    }
};
