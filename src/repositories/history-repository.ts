import { QueryResult } from "pg";
import { History } from "../models/models";
import databaseConnection from "../configs/database-connection";

class HistoryRepository {
    findById(id: number): Promise<QueryResult> {
        const select = `
        SELECT 
            * 
        FROM 
            historico
        WHERE
            id = $1`;
        const values = [id];

        return databaseConnection.pool.query(select, values);
    }

    delete(id: number): Promise<QueryResult> {
        const select = `
            DELETE FROM
                historico
            WHERE 
                id = $1;
        `;

        const values = [id];

        return databaseConnection.pool.query(select, values);
    }

    findAll(): Promise<QueryResult> {
        const select = `SELECT * FROM historico`;

        return databaseConnection.pool.query(select);
    }

    update(id: number, history: History): Promise<QueryResult> {
        const { status, dateTimeUpdate, idBooking }: History = history;
        const select = `
        UPDATE
            historico
        SET 
            status = $1,
            data_hora_modificacao = $2,
            id_reserva = $3
        WHERE 
            id = $4
        `;
        const values = [status, dateTimeUpdate, idBooking, id];

        return databaseConnection.pool.query(select, values);
    }

    create(history: History): Promise<QueryResult> {
        const { status, dateTimeUpdate, idBooking }: History = history;
        const select = `
            INSERT INTO 
                historico(status, data_hora_modificacao, id_reserva)
            VALUES($1, $2, $3);
        `;

        const values = [status, dateTimeUpdate, idBooking];

        return databaseConnection.pool.query(select, values);
    }

}

export default new HistoryRepository();