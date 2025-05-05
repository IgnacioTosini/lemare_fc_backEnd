import request from 'supertest';
import app from '../../server';
import Player from '../../models/Player.model';

jest.mock('../../models/Player.model');
jest.mock('../../config/db', () => ({
    authenticate: jest.fn().mockResolvedValue(true),
    addModels: jest.fn(),
    sync: jest.fn().mockResolvedValue(true),
}));

describe('Player Handlers', () => {
    describe('GET /jugadores', () => {
        it('should return a list of players', async () => {
            const mockPlayers = [
                { id: 1, name: 'Player 1' },
                { id: 2, name: 'Player 2' },
            ];

            (Player.findAll as jest.Mock).mockResolvedValue(mockPlayers);

            const response = await request(app).get('/jugadores');

            expect(response.status).toBe(200);
            expect(response.body.data).toEqual(mockPlayers);
        });

        it('should handle errors when fetching players', async () => {
            (Player.findAll as jest.Mock).mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/jugadores');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Error fetching players');
        });
    });
});