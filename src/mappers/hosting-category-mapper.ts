import { HostingCategoryEntity } from "../entities/entities";
import { HostingCategory } from "../models/models";

class HostingCategoryMapper {
    map(hostingCategoryEntity: HostingCategoryEntity): HostingCategory {
        if (!hostingCategoryEntity) return {};

        const { id_categoria, id_local_hospedagem }: HostingCategoryEntity = hostingCategoryEntity
        const hostingCategory: HostingCategory = {
            idCategory: id_categoria,
            idHosting: id_local_hospedagem,
        };

        return hostingCategory;
    }
}

export default new HostingCategoryMapper();