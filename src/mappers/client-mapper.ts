import { ClientEntity } from "../entities/entities";
import { Client } from "../models/models";

class ClientMapper {
    map(clientEntity: ClientEntity): Client {
        if (!clientEntity) return {};

        const { email, cpf }: ClientEntity = clientEntity
        const client: Client = { email, cpf };

        return client;
    }
}

export default new ClientMapper();