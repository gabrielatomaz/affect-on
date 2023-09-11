import { UserPermissionEntity } from "../entities/entities";
import { UserPermission } from "../models/models";

class UserPermissionMapper {
    map(userPermissionEntity: UserPermissionEntity): UserPermission {
        if (!userPermissionEntity) return {};

        const { nome, descricao }: UserPermissionEntity = userPermissionEntity
        const userPermission: UserPermission = {
            name: nome,
            description: descricao,
        };

        return userPermission;
    }
}

export default new UserPermissionMapper();