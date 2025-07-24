import { Sequelize } from 'sequelize';
import config from './config';

const sequelize = new Sequelize(config.databaseUrl, {
    dialect: 'postgres',
    logging: false,
});

async function connectDB(): Promise<void> {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}

export { sequelize, connectDB };