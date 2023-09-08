import { QueryResult } from "pg";
import { Hosting } from "../models/models";
import databaseConnection from "../configs/database-connection";

class HostingRepository {
    findById(id: number): Promise<QueryResult> {
        const select = `
        SELECT 
            * 
        FROM 
            localdehospedagem
        WHERE
            id = $1`;
        const values = [id];

        return databaseConnection.pool.query(select, values);
    }

    delete(id: number): Promise<QueryResult> {
        const select = `
            DELETE FROM
                localdehospedagem
            WHERE 
                id = $1;
        `;

        const values = [id];

        return databaseConnection.pool.query(select, values);
    }

    findAll(): Promise<QueryResult> {
        const select = `SELECT * FROM localdehospedagem`;

        return databaseConnection.pool.query(select);
    }

    update(id: number, hosting: Hosting): Promise<QueryResult> {
        const { hostType, description, address, name, cnpj }: Hosting = hosting;
        const select = `
        UPDATE
            localdehospedagem
        SET 
        tipo_hospedagem = $1,
            descricao = $2,
            endereço = $3,
            nome = $4,
            cnpj = $5
        WHERE 
            id = $6
        `;
        const values = [hostType, description, address, name, cnpj, id];

        return databaseConnection.pool.query(select, values);
    }

    create(hosting: Hosting): Promise<QueryResult> {
        const { hostType, description, address, name, cnpj }: Hosting = hosting;
        const select = `
            INSERT INTO 
                localdehospedagem(tipo_hospedagem, descricao, endereço, nome, cnpj)
            VALUES($1, $2, $3, $4, $5);
        `;

        const values = [hostType, description, address, name, cnpj];

        return databaseConnection.pool.query(select, values);
    }

}

export default new HostingRepository();