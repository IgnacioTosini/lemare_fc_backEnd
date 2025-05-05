import express from 'express';
import db from './config/db';
import router from './router';
import cors, { CorsOptions } from 'cors';

async function connectDB() {
    try {
        await db.authenticate();
        db.sync()
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connectDB()

const server = express();

const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}

server.use(cors(corsOptions))

server.use(express.json());

server.use('/api', router)

export default server;