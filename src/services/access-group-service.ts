import { AccessGroup } from "../models/models";
import { accessGroupRepository } from "../repositories/repositories";
import { accessGroupMapper } from "../mappers/mappers"

class AccessGroupService {
    async updateAllFields(id: number, accessGroup: AccessGroup): Promise<void> {
        accessGroupRepository.update(id, accessGroup);
    }

    async findAll(): Promise<AccessGroup[]> {
        const { rows: accessGroups } = await accessGroupRepository.findAll();
        return accessGroups.map(preferece => accessGroupMapper.map(preferece));
    }

    async delete(id: number): Promise<void> {
        accessGroupRepository.delete(id);
    }

    async findById(id: number): Promise<AccessGroup> {
        const { rows: [accessGroupFound] } = await accessGroupRepository.findById(id);

        return accessGroupMapper.map(accessGroupFound);
    }

    async create(accessGroup: AccessGroup): Promise<void> {
        accessGroupRepository.create(accessGroup);
    }

}

export default new AccessGroupService();