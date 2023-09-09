import { QueryResult } from "pg";
import { PermissionType } from "../models/models";
import databaseConnection from "../configs/database-connection";

class PermissionTypeRepository {
    findById(id: number): Promise<QueryResult> {
        const select = `
        SELECT 
            * 
        FROM 
            tipodepermissao
        WHERE
            id = $1`;
        const values = [id];

        return databaseConnection.pool.query(select, values);
    }

    delete(id: number): Promise<QueryResult> {
        const select = `
            DELETE FROM
                tipodepermissao
            WHERE 
                id = $1;
        `;

        const values = [id];

        return databaseConnection.pool.query(select, values);
    }

    findAll(): Promise<QueryResult> {
        const select = `SELECT * FROM tipodepermissao`;

        return databaseConnection.pool.query(select);
    }

    update(id: number, permissionType: PermissionType): Promise<QueryResult> {
        const { description }: PermissionType = permissionType;
        const select = `
        UPDATE
            tipodepermissao
        SET 
            descricao = $1
        WHERE 
            id = $2
        `;
        const values = [description, id];

        return databaseConnection.pool.query(select, values);
    }

    create(permissionType: PermissionType): Promise<QueryResult> {
        const { description }: PermissionType = permissionType;
        const select = `
            INSERT INTO 
                tipodepermissao(descricao)
            VALUES($1);
        `;

        const values = [description];

        return databaseConnection.pool.query(select, values);
    }

}

export default new PermissionTypeRepository();