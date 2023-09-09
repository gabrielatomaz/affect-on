import { QueryResult } from "pg";
import { HostingCategory } from "../models/models";
import databaseConnection from "../configs/database-connection";

class HostingCategoryRepository {
    findByIds(hostingCategory: HostingCategory): Promise<QueryResult> {
        const { idHosting, idCategory }: HostingCategory = hostingCategory;
        const select = `
        SELECT 
            * 
        FROM 
            localdehospedagem_categoria
        WHERE
            id_local_hospedagem = $1 AND id_categoria = $2
        `;
        const values = [idHosting, idCategory];

        return databaseConnection.pool.query(select, values);
    }

    delete(hostingCategory: HostingCategory): Promise<QueryResult> {
        const { idHosting, idCategory }: HostingCategory = hostingCategory;
        const select = `
            DELETE FROM
                localdehospedagem_categoria
            WHERE 
                id_local_hospedagem = $1 AND id_categoria = $2
        `;
        const values = [idHosting, idCategory];

        return databaseConnection.pool.query(select, values);
    }

    findAll(): Promise<QueryResult> {
        const select = `SELECT * FROM localdehospedagem_categoria`;

        return databaseConnection.pool.query(select);
    }

    create(hostingCategory: HostingCategory): Promise<QueryResult> {
        const { idHosting, idCategory }: HostingCategory = hostingCategory;
        const select = `
            INSERT INTO 
                localdehospedagem_categoria(id_local_hospedagem, id_categoria)
            VALUES($1, $2);
        `;

        const values = [idHosting, idCategory];

        return databaseConnection.pool.query(select, values);
    }

}

export default new HostingCategoryRepository();