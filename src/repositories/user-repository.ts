import { QueryResult } from "pg";
import databaseConnection from "../configs/database-connection";
import { User } from '../models/models';

class UserRepository {
    insert(user: User): Promise<QueryResult> {
        const { email, phone, name, password } = user;
        const select = `
            INSERT INTO 
                usuario(email, nome, senha, telefone)
            VALUES($1, $2, $3, $4);
        `;
        const values = [email, name, password, phone];

        return databaseConnection.pool.query(select, values);
    }

    findUserByEmailAndPassword(email?: string, password?: string): Promise<QueryResult> {
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

    findAll(): Promise<QueryResult> {
        const select = `
            SELECT
                * 
            FROM usuario
        `;

        return databaseConnection.pool.query(select);
    }

    findByEmail(email?: string): Promise<QueryResult> {
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

    findBy(user: User): Promise<QueryResult> {
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