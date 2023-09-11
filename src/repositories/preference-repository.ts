import { QueryResult } from "pg";
import { Preference } from "../models/models";
import databaseConnection from "../configs/database-connection";

class PreferenceRepository {
    findPreferencesByClientCPF(cpf: string): Promise<QueryResult> {
        const select = `
        SELECT 
            p.*, 
            c.nome AS nome_categoria, 
            c.palavraChave AS palavra_chave_categoria, 
            co.nome AS nome_comodidade
        FROM 
            preferencia p
        LEFT JOIN 
            categoria c ON p.id = c.id_preferencia
        LEFT JOIN 
            comodidade co ON p.id = co.id_preferencia
        WHERE 
            p.cpf = $1
        `;
        const values = [cpf];

        return databaseConnection.pool.query(select, values);
    }
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