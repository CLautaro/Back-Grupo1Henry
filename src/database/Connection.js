import 'dotenv/config'
import pg from 'pg';

const {
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASS
} = process.env;

const { Client } = pg;

const createConnection = async () => {
    const client = new Client({
        host: DB_HOST,
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASS
    });

    await client.connect();
     
    return client;
};

export {
    createConnection
};
