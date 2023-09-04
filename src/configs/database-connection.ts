import { Pool } from "pg";

class DatabaseConnection {
    pool = new Pool({
        // host: process.env.DB_HOST,
        // user: process.env.DB_USER,
        // database: process.env.DB_NAME,
        // password: process.env.DB_PASSWORD,
        // port: parseInt(process.env.DB_PORT || "5432")
        host: 'ep-soft-shadow-82863304.us-east-2.aws.neon.tech',
        user: 'gabrielatomaz',
        database: 'AffectOn',
        password: 'mTli3sWyw4zf',
        port: parseInt('5432'),
        ssl: true,
    });

    async connectToDatabase() {
        try {
            await this.pool.connect();
        } catch (err) {
            console.log(err);
        }
    };
}


export default new DatabaseConnection();