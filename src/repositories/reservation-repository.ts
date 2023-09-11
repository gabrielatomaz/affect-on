import { QueryResult } from "pg";
import { Reservation } from "../models/models";
import databaseConnection from "../configs/database-connection";

class ReservationRepository {
    findReservationsByUserEmail(email: string): PromiseLike<QueryResult> {
        throw new Error("Method not implemented.");
    }
    
    findById(id: number): Promise<QueryResult> {
        const select = `
        SELECT 
            * 
        FROM 
            reserva
        WHERE
            id = $1`;
        const values = [id];

        return databaseConnection.pool.query(select, values);
    }

    delete(id: number): Promise<QueryResult> {
        const select = `
            DELETE FROM
                reserva
            WHERE 
                id = $1;
        `;

        const values = [id];

        return databaseConnection.pool.query(select, values);
    }

    findAll(): Promise<QueryResult> {
        const select = `SELECT * FROM reserva`;

        return databaseConnection.pool.query(select);
    }

    update(id: number, reservation: Reservation): Promise<QueryResult> {
        const { cpf, idOffer, beginDate, endDate }: Reservation = reservation;
        const select = `
        UPDATE
            reserva
        SET 
            cpf = $1,
            id_oferta = $2,
            data_inicio = $3,
            data_fim = $4
        WHERE 
            id = $5
        `;
        const values = [cpf, idOffer, beginDate, endDate, id];

        return databaseConnection.pool.query(select, values);
    }

    create(reservation: Reservation): Promise<QueryResult> {
        const {  cpf, idOffer, beginDate, endDate }: Reservation = reservation;
        const select = `
            INSERT INTO 
                reserva(cpf, id_oferta, data_inicio, data_fim)
            VALUES($1, $2, $3, $4);
        `;

        const values = [cpf, idOffer, beginDate, endDate, cpf];

        return databaseConnection.pool.query(select, values);
    }

}

export default new ReservationRepository();