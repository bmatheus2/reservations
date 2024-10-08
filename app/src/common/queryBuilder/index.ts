import knex from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

export const QueryBuilder = knex({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST || 'postgres',
        user: process.env.DB_USER || 'user',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'database'
    }
});