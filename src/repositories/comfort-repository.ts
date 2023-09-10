import { QueryResult } from "pg";
import { Comfort } from "../models/models";
import databaseConnection from "../configs/database-connection";

class ComfortRepository {
    findById(id: number): Promise<QueryResult> {
        const select = `
        SELECT 
            * 
        FROM 
            comodidade
        WHERE
            id = $1`;
        const values = [id];

        return databaseConnection.pool.query(select, values);
    }

    delete(id: number): Promise<QueryResult> {
        const select = `
            DELETE FROM
                comodidade
            WHERE 
                id = $1;
        `;

        const values = [id];

        return databaseConnection.pool.query(select, values);
    }

    findAll(): Promise<QueryResult> {
        const select = `SELECT * FROM comodidade`;

        return databaseConnection.pool.query(select);
    }

    update(id: number, comfort: Comfort): Promise<QueryResult> {
        const { idPreference, name }: Comfort = comfort;
        const select = `
        UPDATE
            comodidade
        SET 
            id_preferencia = $1,
            nome = $2
        WHERE 
            id = $3
        `;
        const values = [idPreference, name, id];

        return databaseConnection.pool.query(select, values);
    }

    create(comfort: Comfort): Promise<QueryResult> {
        const { idPreference, name }: Comfort = comfort;
        const select = `
            INSERT INTO 
                comodidade(id_preferencia, nome)
            VALUES($1, $2);
        `;

        const values = [idPreference, name];

        return databaseConnection.pool.query(select, values);
    }

}

export default new ComfortRepository();