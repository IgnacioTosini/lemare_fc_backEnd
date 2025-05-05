"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const Player_model_1 = __importDefault(require("../../models/Player.model"));
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
            Player_model_1.default.findAll.mockResolvedValue(mockPlayers);
            const response = await (0, supertest_1.default)(server_1.default).get('/jugadores');
            expect(response.status).toBe(200);
            expect(response.body.data).toEqual(mockPlayers);
        });
        it('should handle errors when fetching players', async () => {
            Player_model_1.default.findAll.mockRejectedValue(new Error('Database error'));
            const response = await (0, supertest_1.default)(server_1.default).get('/jugadores');
            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Error fetching players');
        });
    });
});
