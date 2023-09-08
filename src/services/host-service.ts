import { Host } from "../models/models";
import { HostRepository } from "../repositories/repositories";
import { HostMapper } from "../mappers/mappers"

class HostService {
    async updateAllFields(email: string, host: Host): Promise<void> {
        HostRepository.update(email, host);
    }

    async findAll(): Promise<Host[]> {
        const { rows: hosts } = await HostRepository.findAll();
        return hosts.map(preferece => HostMapper.map(preferece));
    }

    async delete(email: string): Promise<void> {
        HostRepository.delete(email);
    }

    async findById(email: string): Promise<Host> {
        const { rows: [hostFound] } = await HostRepository.findById(email);

        return HostMapper.map(hostFound);
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
        HostRepository.update(email, hostToBeUpdated);
    }

    async create(host: Host): Promise<void> {
        HostRepository.create(host);
    }

}

export default new HostService();