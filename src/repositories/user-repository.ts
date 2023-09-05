import { QueryResult } from "pg";
import databaseConnection from "../configs/database-connection";
import { User } from '../models/models';

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

    async findAll(): Promise<QueryResult> {
        const select = `
            SELECT
                * 
            FROM usuario
        `;

        return databaseConnection.pool.query(select);
    }

    async findByEmail(email?: string): Promise<QueryResult> {
        const select = `
            SELECT
                * 
            FROM usuario 
            WHERE 1 = 1 
            AND email = $1
        `;
        const values = [email];

        return databaseConnection.pool.query(select, values);
    }

    async findBy(user: User): Promise<QueryResult> {
        const { name, email, password, phone }: User = user;
        const select = `
            SELECT
                * 
            FROM usuario 
            WHERE 1 = 1 
            AND (
                email = $1
                OR nome = $2 
                OR senha = $3
                OR telefone = $4
            )
        `;
        const values = [email, name, password, phone];

        return databaseConnection.pool.query(select, values);
    }
}

export default new UserRepository();