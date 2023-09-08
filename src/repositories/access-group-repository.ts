import { QueryResult } from "pg";
import { AccessGroup } from "../models/models";
import databaseConnection from "../configs/database-connection";

class AccessGroupRepository {
    findById(id: number): Promise<QueryResult> {
        const select = `
        SELECT 
            * 
        FROM 
            grupodeacesso
        WHERE
            id = $1`;
        const values = [id];

        return databaseConnection.pool.query(select, values);
    }

    delete(id: number): Promise<QueryResult> {
        const select = `
            DELETE FROM
                grupodeacesso
            WHERE 
                id = $1;
        `;

        const values = [id];

        return databaseConnection.pool.query(select, values);
    }

    findAll(): Promise<QueryResult> {
        const select = `SELECT * FROM grupodeacesso`;

        return databaseConnection.pool.query(select);
    }

    update(id: number, accessGroup: AccessGroup): Promise<QueryResult> {
        const { description }: AccessGroup = accessGroup;
        const select = `
        UPDATE
            grupodeacesso
        SET 
            descricao = $1
        WHERE 
            id = $2
        `;
        const values = [description, id];

        return databaseConnection.pool.query(select, values);
    }

    create(accessGroup: AccessGroup): Promise<QueryResult> {
        const { description }: AccessGroup = accessGroup;
        const select = `
            INSERT INTO 
                grupodeacesso(descricao)
            VALUES($1);
        `;

        const values = [description];

        return databaseConnection.pool.query(select, values);
    }

}

export default new AccessGroupRepository();