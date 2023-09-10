import { QueryResult } from "pg";
import { Complaint } from "../models/models";
import databaseConnection from "../configs/database-connection";

class ComplaintRepository {
    findById(id: number): Promise<QueryResult> {
        const select = `
        SELECT 
            * 
        FROM 
            denuncia
        WHERE
            id = $1`;
        const values = [id];

        return databaseConnection.pool.query(select, values);
    }

    delete(id: number): Promise<QueryResult> {
        const select = `
            DELETE FROM
                denuncia
            WHERE 
                id = $1;
        `;

        const values = [id];

        return databaseConnection.pool.query(select, values);
    }

    findAll(): Promise<QueryResult> {
        const select = `SELECT * FROM denuncia`;

        return databaseConnection.pool.query(select);
    }

    update(id: number, complaint: Complaint): Promise<QueryResult> {
        const { status, description, idAccomodation, cpf }: Complaint = complaint;
        const select = `
        UPDATE
            denuncia
        SET 
            status = $1,
            descricao = $2,
            id_local_hospedagem = $3
            cpf = $4
        WHERE 
            id = $5
        `;
        const values = [status, description, idAccomodation, cpf, id];

        return databaseConnection.pool.query(select, values);
    }

    create(complaint: Complaint): Promise<QueryResult> {
        const { status, description, idAccomodation, cpf }: Complaint = complaint;
        const select = `
            INSERT INTO 
                denuncia(status, descricao, id_local_hospedagem, cpf)
            VALUES($1, $2, $3, $4);
        `;

        const values = [status, description, idAccomodation, cpf];

        return databaseConnection.pool.query(select, values);
    }

}

export default new ComplaintRepository();