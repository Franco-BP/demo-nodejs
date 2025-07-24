import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    databaseUrl: string;
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    databaseUrl: process.env.DATABASE || '',
};

// Basic validation for critical environment variables
if (!config.databaseUrl) {
    console.error('FATAL ERROR: DATABASE is not defined in environment variables.');
    process.exit(1);
}

export default config;