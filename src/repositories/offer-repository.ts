import { QueryResult } from "pg";
import { Offer } from "../models/models";
import databaseConnection from "../configs/database-connection";

class OfferRepository {
    findById(id: number): Promise<QueryResult> {
        const select = `
        SELECT 
            * 
        FROM 
            oferta
        WHERE
            id = $1`;
        const values = [id];

        return databaseConnection.pool.query(select, values);
    }

    delete(id: number): Promise<QueryResult> {
        const select = `
            DELETE FROM
                oferta
            WHERE 
                id = $1;
        `;

        const values = [id];

        return databaseConnection.pool.query(select, values);
    }

    findAll(): Promise<QueryResult> {
        const select = `SELECT * FROM oferta`;

        return databaseConnection.pool.query(select);
    }

    update(id: number, offer: Offer): Promise<QueryResult> {
        const {
            description,
            numberOfAdults,
            numberOfKids,
            numberOfRooms,
            numberOfBeds,
            area,
            value,
            idAccomodation,
        }: Offer = offer;
        const select = `
        UPDATE
            oferta
        SET 
            descricao = $1, 
            n_adultos = $2, 
            n_criancas = $3, 
            n_quartos = $4, 
            n_camas = $5, 
            area = $6, 
            valor = $7, 
            id_local_hospedagem = $8
        WHERE 
            id = $9
        `;
        const values = [
            description,
            numberOfAdults,
            numberOfKids,
            numberOfRooms,
            numberOfBeds,
            area,
            value,
            idAccomodation,
            id,
        ];

        return databaseConnection.pool.query(select, values);
    }

    create(offer: Offer): Promise<QueryResult> {
        const {
            description,
            numberOfAdults,
            numberOfKids,
            numberOfRooms,
            numberOfBeds,
            area,
            value,
            idAccomodation,
        }: Offer = offer;
        const select = `
            INSERT INTO 
                oferta(descricao, n_adultos, n_criancas, n_quartos, 
                    n_camas, area, valor, id_local_hospedagem)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8);
        `;
        const values = [
            description,
            numberOfAdults,
            numberOfKids,
            numberOfRooms,
            numberOfBeds,
            area,
            value,
            idAccomodation,
        ];

        return databaseConnection.pool.query(select, values);
    }

}

export default new OfferRepository();