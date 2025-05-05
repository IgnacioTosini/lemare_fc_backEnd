import { exit } from 'node:process';
import db from '../config/db';

const clearDB = async () => {
    try {
        await db.sync({ force: true }); // Sincronizar la base de datos y eliminar todos los datos existentes
        console.log('Database cleared successfully!');
        exit(0); // Salir con un código de éxito
    } catch (error) {
        console.error('Error clearing the database:', error);
        exit(1); // Salir con un código de error si ocurre un problema
    }
}

if ( process.argv[2] === '--clear-db' ) {
    clearDB();
}