import { Hosting, HostingComfortCategory } from "../models/models";
import { hostingRepository } from "../repositories/repositories";
import { hostingMapper, hostingComfortCategoryMapper } from "../mappers/mappers"

class HostingService {
    async findHostingsComfortCategoryRoute(): Promise<HostingComfortCategory[]> {
        const { rows: hostingsComfortCategory } = await hostingRepository
            .findHostingsComfortCategoryRoute();
        return hostingsComfortCategory.map(hostingComfortCategory => hostingComfortCategoryMapper.map(hostingComfortCategory));
    }

    async updateAllFields(id: number, hosting: Hosting): Promise<void> {
        hostingRepository.update(id, hosting);
    }

    async findAll(): Promise<Hosting[]> {
        const { rows: hostings } = await hostingRepository.findAll();
        return hostings.map(hosting => hostingMapper.map(hosting));
    }

    async delete(id: number): Promise<void> {
        hostingRepository.delete(id);
    }

    async findById(id: number): Promise<Hosting> {
        const { rows: [hostingFound] } = await hostingRepository.findById(id);

        return hostingMapper.map(hostingFound);
    }

    async update(id: number, hosting: Hosting): Promise<void> {
        const { address, cnpj, description, hostType, name } = hosting;
        const {
            address: addressFound,
            cnpj: cnpjFound,
            name: nameFound,
            hostType: hostTypeFound,
            description: descriptionFound,
        }: Hosting = await this.findById(id);
        const hostingToBeUpdated: Hosting = {
            address: address ? address : addressFound,
            cnpj: cnpj ? cnpj : cnpjFound,
            name: name ? name : nameFound,
            hostType: hostType ? hostType : hostTypeFound,
            description: description ? description : descriptionFound,
        };
        hostingRepository.update(id, hostingToBeUpdated);
    }

    async create(hosting: Hosting): Promise<void> {
        hostingRepository.create(hosting);
    }

}

export default new HostingService();