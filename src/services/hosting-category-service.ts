import { HostingCategory } from "../models/models";
import { hostingCategoryRepository } from "../repositories/repositories";
import { hostingCategoryMapper } from "../mappers/mappers"

class HostingCategoryService {
    async findAll(): Promise<HostingCategory[]> {
        const { rows: hostingCategorys } = await hostingCategoryRepository.findAll();
        return hostingCategorys.map(preferece => hostingCategoryMapper.map(preferece));
    }

    async delete(idHosting: number, idCategory: number): Promise<void> {
        const hostingCategory: HostingCategory = { idCategory, idHosting };
        hostingCategoryRepository.delete(hostingCategory);
    }

    async findByIds(idHosting: number, idCategory: number): Promise<HostingCategory> {
        const hostingCategory: HostingCategory = { idHosting, idCategory };
        const { rows: [hostingCategoryFound] } =
            await hostingCategoryRepository.findByIds(hostingCategory);

        return hostingCategoryMapper.map(hostingCategoryFound);
    }

    async create(hostingCategory: HostingCategory): Promise<void> {
        hostingCategoryRepository.create(hostingCategory);
    }

}

export default new HostingCategoryService();