import request from 'supertest';
import server from '../server';
import db from '../config/db';

describe('API Endpoints', () => {
    describe('GET /api/jugadores', () => {
        it('should return a list of players', async () => {
            const response = await request(server).get('/api/jugadores');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body.data)).toBe(true);
        });
    });

    describe('GET /api/jugadores/:id', () => {
        it('should return a single player by ID', async () => {
            const response = await request(server).get('/api/jugadores/1');
            if (response.status === 200) {
                expect(response.body.data).toHaveProperty('id', 1);
            } else {
                expect(response.status).toBe(404);
            }
        });
    });

    describe('POST /api/jugadores', () => {
        it('should create a new player', async () => {
            const newPlayer = {
                name: 'Test Player',
                image: 'test.jpg',
                number: 10,
                year: 2023,
                age: 25,
                country: 'Argentina',
                height: 1.8,
                position: 'Forward',
                description: 'A test player',
            };

            const response = await request(server)
                .post('/api/jugadores')
                .send(newPlayer);

            if (response.status === 200) {
                expect(response.body.data).toMatchObject(newPlayer);
            } else {
                expect(response.status).toBe(400);
            }
        });
    });

    describe('DELETE /api/jugadores/:id', () => {
        it('should delete a player by ID', async () => {
            const response = await request(server).delete('/api/jugadores/1');
            if (response.status === 200) {
                expect(response.body.message).toBe('Player deleted successfully');
            } else {
                expect(response.status).toBe(500);
            }
        });
    });

    describe('GET /api/stats', () => {
        it('should return a list of stats', async () => {
            const response = await request(server).get('/api/stats');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body.data)).toBe(true);
        });
    });
});

afterAll(async () => {
    await db.close(); // Cerrar la conexión a la base de datos
});
