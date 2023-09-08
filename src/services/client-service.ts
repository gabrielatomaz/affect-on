import { Client } from "../models/models";
import { ClientRepository } from "../repositories/repositories";
import { ClientMapper } from "../mappers/mappers"

class ClientService {
    async updateAllFields(email: string, client: Client): Promise<void> {
        ClientRepository.update(email, client);
    }

    async findAll(): Promise<Client[]> {
        const { rows: clients } = await ClientRepository.findAll();
        return clients.map(preferece => ClientMapper.map(preferece));
    }

    async delete(email: string): Promise<void> {
        ClientRepository.delete(email);
    }

    async findById(email: string): Promise<Client> {
        const { rows: [clientFound] } = await ClientRepository.findById(email);

        return ClientMapper.map(clientFound);
    }

    async update(email: string, client: Client): Promise<void> {
        const { email: emailToUpdate, cpf } = client;
        const {
            email: emailFound,
            cpf: cpfFound,
        }: Client = await this.findById(email);
        const clientToBeUpdated: Client = {
            email: emailToUpdate ? emailToUpdate : emailFound,
            cpf: cpf ? cpf : cpfFound,
        };
        ClientRepository.update(email, clientToBeUpdated);
    }

    async create(client: Client): Promise<void> {
        ClientRepository.create(client);
    }

}

export default new ClientService();