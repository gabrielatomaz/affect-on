import { QueryResult } from "pg";
import { AccessGroupPermissionType } from "../models/models";
import databaseConnection from "../configs/database-connection";

class AccessGroupPermissionTypeRepository {
    findByIds(accessGroupPermissionType: AccessGroupPermissionType): Promise<QueryResult> {
        const { idGroup, idPermissionType }: AccessGroupPermissionType = accessGroupPermissionType;
        const select = `
        SELECT 
            * 
        FROM 
            grupodeacesso_tipodepermissao
        WHERE
            id_grupo = $1 AND id_tipo_permissao = $2
        `;
        const values = [idGroup, idPermissionType];

        return databaseConnection.pool.query(select, values);
    }

    delete(accessGroupPermissionType: AccessGroupPermissionType): Promise<QueryResult> {
        const { idGroup, idPermissionType }: AccessGroupPermissionType = accessGroupPermissionType;
        const select = `
            DELETE FROM
                grupodeacesso_tipodepermissao
            WHERE 
                id_grupo = $1 AND id_tipo_permissao = $2
        `;
        const values = [idGroup, idPermissionType];

        return databaseConnection.pool.query(select, values);
    }

    findAll(): Promise<QueryResult> {
        const select = `SELECT * FROM grupodeacesso_tipodepermissao`;

        return databaseConnection.pool.query(select);
    }

    create(accessGroupPermissionType: AccessGroupPermissionType): Promise<QueryResult> {
        const { idGroup, idPermissionType }: AccessGroupPermissionType = accessGroupPermissionType;
        const select = `
            INSERT INTO 
                grupodeacesso_tipodepermissao(id_grupo, id_tipo_permissao)
            VALUES($1);
        `;

        const values = [idGroup, idPermissionType];

        return databaseConnection.pool.query(select, values);
    }

}

export default new AccessGroupPermissionTypeRepository();