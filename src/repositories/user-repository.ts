import { QueryResult } from "pg";
import databaseConnection from "../configs/database-connection";
import { User } from '../models/models'

class UserRepository {
    async findUserByEmailAndPassword(email?: string, password?: string): Promise<QueryResult> {
        const select = `
            SELECT
                * 
            FROM usuario 
            WHERE 1 = 1 
            AND email = $1 
            AND senha = $2
        `;
        const values = [email, password];

        return databaseConnection.pool.query(select, values);
    }
}

export default new UserRepository();