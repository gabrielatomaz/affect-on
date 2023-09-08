import { Host } from "../models/models";
import { hostRepository } from "../repositories/repositories";
import { hostMapper } from "../mappers/mappers"

class HostService {
    async updateAllFields(email: string, host: Host): Promise<void> {
        hostRepository.update(email, host);
    }

    async findAll(): Promise<Host[]> {
        const { rows: hosts } = await hostRepository.findAll();
        return hosts.map(preferece => hostMapper.map(preferece));
    }

    async delete(email: string): Promise<void> {
        hostRepository.delete(email);
    }

    async findById(email: string): Promise<Host> {
        const { rows: [hostFound] } = await hostRepository.findById(email);

        return hostMapper.map(hostFound);
    }

    async update(email: string, host: Host): Promise<void> {
        const { email: emailToUpdate, cnpj, fantasyName } = host;
        const {
            email: emailFound,
            cnpj: cnpjFound,
            fantasyName: fantasyNameFoud,
        }: Host = await this.findById(email);
        const hostToBeUpdated: Host = {
            email: emailToUpdate ? emailToUpdate : emailFound,
            cnpj: cnpj ? cnpj : cnpjFound,
            fantasyName: fantasyName ? fantasyName : fantasyNameFoud,
        };
        hostRepository.update(email, hostToBeUpdated);
    }

    async create(host: Host): Promise<void> {
        hostRepository.create(host);
    }

}

export default new HostService();