import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import Player from "../models/Player.model";
import SocialMedia from "../models/SocialMedia.model";
import Stats from "../models/Stats.model";

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [Player, SocialMedia, Stats],
    logging: process.env.NODE_ENV !== 'test',
});

db.addModels([Player, SocialMedia, Stats]);

db.authenticate()
    .then(() => console.log('Database connection established successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error));

export default db;