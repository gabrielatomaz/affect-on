import { AccessGroupPermissionTypeEntity } from "../entities/entities";
import { AccessGroupPermissionType } from "../models/models";

class AccessGroupPermissionTypeMapper {
    map(accessGroupPermissionTypeEntity: AccessGroupPermissionTypeEntity): AccessGroupPermissionType {
        if (!accessGroupPermissionTypeEntity) return {};

        const { id_grupo, id_tipo_permissao }: AccessGroupPermissionTypeEntity = accessGroupPermissionTypeEntity
        const accessGroupPermissionType: AccessGroupPermissionType = { 
            idGroup: id_grupo, 
            idPermissionType: id_tipo_permissao, 
        };

        return accessGroupPermissionType;
    }
}

export default new AccessGroupPermissionTypeMapper();