import { QueryResult } from "pg";
import databaseConnection from "../configs/database-connection";
import { User } from '../models/models';

class UserRepository {
    findUserPermission(email: string): Promise<QueryResult> {
        const select = `
        SELECT 
            u.nome, 
            tp.descricao
        FROM 
            usuario u
        INNER JOIN 
            grupodeacesso ga ON u.id_grupo = ga.id
        LEFT JOIN 
            grupodeacesso_tipodepermissao ga_tp ON ga.id = ga_tp.id_grupo
        LEFT JOIN 
            tipodepermissao tp ON ga_tp.id_tipo_permissao = tp.id
        WHERE 
            u.email = $1
        ORDER BY 
            tp.descricao
        `;
        const values = [email];

        return databaseConnection.pool.query(select, values);
    }
    async insert(user: User): Promise<void> {
        const { email, phone, name, password, groupId } = user;
        const select = `
            INSERT INTO 
                usuario(email, nome, senha, telefone, id_grupo)
            VALUES($1, $2, $3, $4, $5);
        `;
        const values = [email, name, password, phone, groupId];

        databaseConnection.pool.query(select, values, (error, result) => { });
    }

    delete(email: string): Promise<QueryResult> {
        const select = `
            DELETE FROM
                usuario
            WHERE email = $1;
        `;
        const values = [email];

        return databaseConnection.pool.query(select, values);
    }

    async update(email: string, user: User): Promise<void> {
        const { email: userEmail, phone, name, password, groupId } = user;
        const select = `
            UPDATE
                usuario
            SET 
                email = $1,
                nome = $2,
                senha = $3,
                telefone = $4
                groupId = $5
            WHERE 
                email = $6
        `;
        const values = [userEmail, name, password, phone, groupId, email];

        databaseConnection.pool.query(select, values, (error, result) => {
        });
    }

    findUserByEmailAndPassword(email?: string, password?: string): Promise<QueryResult> {
        const select = `
            SELECT
                * 
            FROM usuario 
            WHERE 1 = 1 
            AND email = $1 
            AND senha = $2
        `;
        const values = [email, password];

        return databaseConnection.pool.query(select, values);
    }

    findAll(): Promise<QueryResult> {
        const select = `
            SELECT
                * 
            FROM usuario
        `;

        return databaseConnection.pool.query(select);
    }

    findByEmail(email?: string): Promise<QueryResult> {
        const select = `
            SELECT
                * 
            FROM usuario 
            WHERE 1 = 1 
            AND email = $1
        `;
        const values = [email];

        return databaseConnection.pool.query(select, values);
    }

    findBy(user: User): Promise<QueryResult> {
        const { name, email, password, phone, groupId }: User = user;
        const select = `
            SELECT
                * 
            FROM usuario 
            WHERE 1 = 1 
            AND (
                email = $1
                OR nome = $2 
                OR senha = $3
                OR telefone = $4
                OR grupo_id = $5
            )
        `;

        const values = [email, name, password, phone, groupId];

        return databaseConnection.pool.query(select, values);
    }
}

export default new UserRepository();