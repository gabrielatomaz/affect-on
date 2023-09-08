import { QueryResult } from "pg";
import { Category } from "../models/models";
import databaseConnection from "../configs/database-connection";

class CategoryRepository {
    findById(id: number): Promise<QueryResult> {
        const select = `
        SELECT 
            * 
        FROM 
            categoria
        WHERE
            id = $1`;
        const values = [id];

        return databaseConnection.pool.query(select, values);
    }

    delete(id: number): Promise<QueryResult> {
        const select = `
            DELETE FROM
                categoria
            WHERE 
                id = $1;
        `;

        const values = [id];

        return databaseConnection.pool.query(select, values);
    }

    findAll(): Promise<QueryResult> {
        const select = `SELECT * FROM categoria`;

        return databaseConnection.pool.query(select);
    }

    update(id: number, category: Category): Promise<QueryResult> {
        const { idPreference, name, keyWord }: Category = category;
        const select = `
        UPDATE
            categoria
        SET 
            id_preferencia = $1,
            nome = $2,
            palavrachave = $3
        WHERE 
            id = $4
        `;
        const values = [idPreference, name, keyWord, id];

        return databaseConnection.pool.query(select, values);
    }

    create(category: Category): Promise<QueryResult> {
        const { idPreference, name, keyWord }: Category = category;
        const select = `
            INSERT INTO 
                categoria(id_preferencia, nome, palavrachave)
            VALUES($1, $2, $3);
        `;

        const values = [idPreference, name, keyWord];

        return databaseConnection.pool.query(select, values);
    }

}

export default new CategoryRepository();