import { Client } from "../models/models";
import { clientRepository } from "../repositories/repositories";
import { clientMapper } from "../mappers/mappers"

class ClientService {
    async updateAllFields(email: string, client: Client): Promise<void> {
        clientRepository.update(email, client);
    }

    async findAll(): Promise<Client[]> {
        const { rows: clients } = await clientRepository.findAll();
        return clients.map(client => clientMapper.map(client));
    }

    async delete(email: string): Promise<void> {
        clientRepository.delete(email);
    }

    async findById(email: string): Promise<Client> {
        const { rows: [clientFound] } = await clientRepository.findById(email);

        return clientMapper.map(clientFound);
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
        clientRepository.update(email, clientToBeUpdated);
    }

    async create(client: Client): Promise<void> {
        clientRepository.create(client);
    }

}

export default new ClientService();