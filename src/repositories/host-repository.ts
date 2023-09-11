import { QueryResult } from "pg";
import { Host } from "../models/models";
import databaseConnection from "../configs/database-connection";

class HostRepository {
    findById(email: string): Promise<QueryResult> {
        const select = `
        SELECT 
            * 
        FROM 
            hospedeiro
        WHERE
            email = $1`;
        const values = [email];

        return databaseConnection.pool.query(select, values);
    }

    delete(email: string): Promise<QueryResult> {
        const select = `
            DELETE FROM
                hospedeiro
            WHERE 
                email = $1;
        `;

        const values = [email];

        return databaseConnection.pool.query(select, values);
    }

    findAll(): Promise<QueryResult> {
        const select = `SELECT * FROM hospedeiro`;

        return databaseConnection.pool.query(select);
    }

    async update(email: string, host: Host): Promise<void> {
        const { email: emailToBeUpdated, cnpj, fantasyName }: Host = host;
        const select = `
        UPDATE
            hospedeiro
        SET 
            email = $1,
            cnpj = $2,
            nome_fantasia = $3
        WHERE 
            email = $4
        `;
        const values = [emailToBeUpdated, cnpj, fantasyName, email];

        return databaseConnection.pool.query(select, values, (error, result) => { });
    }

    async create(host: Host): Promise<void> {
        const { email, cnpj, fantasyName }: Host = host;
        const select = `
            INSERT INTO 
                hospedeiro(email, cnpj, nome_fantasia)
            VALUES($1, $2, $3);
        `;

        const values = [email, cnpj, fantasyName];

        databaseConnection.pool.query(select, values, (error, result) => { });
    }

}

export default new HostRepository();