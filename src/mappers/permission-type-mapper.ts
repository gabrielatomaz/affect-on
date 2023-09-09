import { PermissionTypeEntity } from "../entities/entities";
import { PermissionType } from "../models/models";

class PermissionTypeMapper {
    map(pPermissionTypeEntity: PermissionTypeEntity): PermissionType {
        if (!pPermissionTypeEntity) return {};

        const { id, descricao }: PermissionTypeEntity = pPermissionTypeEntity
        const pPermissionType: PermissionType = { 
            id, 
            description: descricao, 
        };

        return pPermissionType;
    }
}

export default new PermissionTypeMapper();