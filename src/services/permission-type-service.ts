import { PermissionType } from "../models/models";
import { permissionTypeRepository } from "../repositories/repositories";
import { permissionTypeMapper } from "../mappers/mappers"

class PermissionTypeService {
    async updateAllFields(id: number, permissionType: PermissionType): Promise<void> {
        permissionTypeRepository.update(id, permissionType);
    }

    async findAll(): Promise<PermissionType[]> {
        const { rows: permissionTypes } = await permissionTypeRepository.findAll();
        return permissionTypes.map(preferece => permissionTypeMapper.map(preferece));
    }

    async delete(id: number): Promise<void> {
        permissionTypeRepository.delete(id);
    }

    async findById(id: number): Promise<PermissionType> {
        const { rows: [permissionTypeFound] } = await permissionTypeRepository.findById(id);

        return permissionTypeMapper.map(permissionTypeFound);
    }

    async create(permissionType: PermissionType): Promise<void> {
        permissionTypeRepository.create(permissionType);
    }

}

export default new PermissionTypeService();