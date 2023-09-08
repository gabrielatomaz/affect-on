import { QueryResult } from "pg";
import Preference from "../models/prefence";
import databaseConnection from "../configs/database-connection";

class PreferenceRepository {
    create(preference: Preference): Promise<QueryResult> {
        const { cpf, response } = preference;
        const select = `
            INSERT INTO 
                preferencia(cpf, resposta)
            VALUES($1, $2);
        `;

        const values = [cpf, response];

        return databaseConnection.pool.query(select, values);
    }

}

export default new PreferenceRepository();