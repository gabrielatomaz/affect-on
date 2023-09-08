import { QueryResult } from "pg";
import { Client } from "../models/models";
import databaseConnection from "../configs/database-connection";

class ClientRepository {
    findById(email: string): Promise<QueryResult> {
        const select = `
        SELECT 
            * 
        FROM 
            cliente
        WHERE
            email = $1`;
        const values = [email];

        return databaseConnection.pool.query(select, values);
    }

    delete(email: string): Promise<QueryResult> {
        const select = `
            DELETE FROM
                cliente
            WHERE 
                email = $1;
        `;

        const values = [email];

        return databaseConnection.pool.query(select, values);
    }

    findAll(): Promise<QueryResult> {
        const select = `SELECT * FROM cliente`;

        return databaseConnection.pool.query(select);
    }

    update(email: string, client: Client): Promise<QueryResult> {
        const { email: emailToBeUpdated, cpf }: Client = client;
        const select = `
        UPDATE
            cliente
        SET 
            email = $1,
            cpf = $2
        WHERE 
            email = $3
        `;
        const values = [emailToBeUpdated, cpf, email];

        return databaseConnection.pool.query(select, values);
    }

    create(client: Client): Promise<QueryResult> {
        const { email, cpf }: Client = client;
        const select = `
            INSERT INTO 
                cliente(email, cpf)
            VALUES($1, $2);
        `;

        const values = [email, cpf];

        return databaseConnection.pool.query(select, values);
    }

}

export default new ClientRepository();