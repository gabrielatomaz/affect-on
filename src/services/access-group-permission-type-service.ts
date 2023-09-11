import { AccessGroupPermissionType } from "../models/models";
import { accessGroupPermissionTypeRepository } from "../repositories/repositories";
import { accessGroupPermissionTypeMapper } from "../mappers/mappers"

class AccessGroupPermissionTypeService {
    async findAll(): Promise<AccessGroupPermissionType[]> {
        const { rows: accessGroupPermissionTypes } = await accessGroupPermissionTypeRepository.findAll();
        return accessGroupPermissionTypes.map(accessGroupPermissionType => accessGroupPermissionTypeMapper.map(accessGroupPermissionType));
    }

    async delete(idGroup: number, idPermissionType: number): Promise<void> {
        const accessGroupPermissionType: AccessGroupPermissionType = { idGroup, idPermissionType };
        accessGroupPermissionTypeRepository.delete(accessGroupPermissionType);
    }

    async findByIds(idGroup: number, idPermissionType: number): Promise<AccessGroupPermissionType> {
        const accessGroupPermissionType: AccessGroupPermissionType = { idGroup, idPermissionType };
        const { rows: [accessGroupPermissionTypeFound] } =
            await accessGroupPermissionTypeRepository.findByIds(accessGroupPermissionType);

        return accessGroupPermissionTypeMapper.map(accessGroupPermissionTypeFound);
    }

    async create(accessGroupPermissionType: AccessGroupPermissionType): Promise<void> {
        accessGroupPermissionTypeRepository.create(accessGroupPermissionType);
    }

}

export default new AccessGroupPermissionTypeService();