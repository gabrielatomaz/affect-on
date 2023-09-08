import { QueryResult } from "pg";
import { Preference } from "../models/models";
import databaseConnection from "../configs/database-connection";

class PreferenceRepository {
    findById(id: number): Promise<QueryResult> {
        const select = `
        SELECT 
            * 
        FROM 
            preferencia
        WHERE
            id = $1`;
        const values = [id];

        return databaseConnection.pool.query(select, values);
    }

    delete(id: number): Promise<QueryResult> {
        const select = `
            DELETE FROM
                preferencia
            WHERE 
                id = $1;
        `;

        const values = [id];

        return databaseConnection.pool.query(select, values);
    }

    findAll(): Promise<QueryResult> {
        const select = `SELECT * FROM preferencia`;

        return databaseConnection.pool.query(select);
    }

    update(id: number, preference: Preference): Promise<QueryResult> {
        const { cpf, response }: Preference = preference;
        const select = `
        UPDATE
            preferencia
        SET 
            cpf = $1,
            resposta = $2
        WHERE 
            id = $3
        `;
        const values = [cpf, response, id];

        return databaseConnection.pool.query(select, values);
    }

    create(preference: Preference): Promise<QueryResult> {
        const { cpf, response }: Preference = preference;
        const select = `
            INSERT INTO 
                preferencia(cpf, resposta)
            VALUES($1, $2);
        `;

        const values = [cpf, response];

        return databaseConnection.pool.query(select, values);
    }

}

export default new PreferenceRepository();