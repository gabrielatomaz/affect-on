import { QueryResult } from "pg";
import { Rating } from "../models/models";
import databaseConnection from "../configs/database-connection";

class RatingRepository {
    findRatingsByClientCPF(cpf: string): Promise<QueryResult> {
        const select = `
        SELECT 
            a.*, 
            lh.nome AS nome_local_hospedagem
        FROM 
            avaliacao a
        INNER JOIN 
            localdehospedagem lh ON a.id_local_hospedagem = lh.id
        WHERE 
            a.cpf = $1;
        `;
        const values = [cpf];

        return databaseConnection.pool.query(select, values);
    }

    findById(id: number): Promise<QueryResult> {
        const select = `
        SELECT 
            * 
        FROM 
            avaliacao
        WHERE
            id = $1`;
        const values = [id];

        return databaseConnection.pool.query(select, values);
    }

    delete(id: number): Promise<QueryResult> {
        const select = `
            DELETE FROM
                avaliacao
            WHERE 
                id = $1;
        `;

        const values = [id];

        return databaseConnection.pool.query(select, values);
    }

    findAll(): Promise<QueryResult> {
        const select = `SELECT * FROM avaliacao`;

        return databaseConnection.pool.query(select);
    }

    update(id: number, rating: Rating): Promise<QueryResult> {
        const { score, comment, idAccommodation, cpf }: Rating = rating;
        const select = `
        UPDATE
            avaliacao
        SET 
            nota = $1,
            comentario = $2,
            id_local_hospedagem = $3,
            cpf = $4
        WHERE 
            id = $5
        `;
        const values = [score, comment, idAccommodation, cpf, id];

        return databaseConnection.pool.query(select, values);
    }

    create(rating: Rating): Promise<QueryResult> {
        const { score, comment, idAccommodation, cpf }: Rating = rating;
        const select = `
            INSERT INTO 
                avaliacao(nota, comentario, id_local_hospedagem, cpf)
            VALUES($1, $2, $3, $4);
        `;

        const values = [score, comment, idAccommodation, cpf];

        return databaseConnection.pool.query(select, values);
    }

}

export default new RatingRepository();