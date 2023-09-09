import { QueryResult } from "pg";
import { HostingComfort } from "../models/models";
import databaseConnection from "../configs/database-connection";

class HostingComfortRepository {
    findByIds(hostingComfort: HostingComfort): Promise<QueryResult> {
        const { idHosting, idComfort }: HostingComfort = hostingComfort;
        const select = `
        SELECT 
            * 
        FROM 
            localdehospedagem_comodidade
        WHERE
            id_local_hospedagem = $1 AND id_comodidade = $2
        `;
        const values = [idHosting, idComfort];

        return databaseConnection.pool.query(select, values);
    }

    delete(hostingComfort: HostingComfort): Promise<QueryResult> {
        const { idHosting, idComfort }: HostingComfort = hostingComfort;
        const select = `
            DELETE FROM
                localdehospedagem_comodidade
            WHERE 
                id_local_hospedagem = $1 AND id_comodidade = $2
        `;
        const values = [idHosting, idComfort];

        return databaseConnection.pool.query(select, values);
    }

    findAll(): Promise<QueryResult> {
        const select = `SELECT * FROM localdehospedagem_comodidade`;

        return databaseConnection.pool.query(select);
    }

    create(hostingComfort: HostingComfort): Promise<QueryResult> {
        const { idHosting, idComfort }: HostingComfort = hostingComfort;
        const select = `
            INSERT INTO 
                localdehospedagem_comodidade(id_local_hospedagem, id_comodidade)
            VALUES($1, $2);
        `;

        const values = [idHosting, idComfort];

        return databaseConnection.pool.query(select, values);
    }

}

export default new HostingComfortRepository();