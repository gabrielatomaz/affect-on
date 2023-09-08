import { AccessGroupEntity } from "../entities/entities";
import { AccessGroup } from "../models/models";

class AccessGroupMapper {
    map(accessGroupEntity: AccessGroupEntity): AccessGroup {
        if (!accessGroupEntity) return {};

        const { id, descricao }: AccessGroupEntity = accessGroupEntity
        const accessGroup: AccessGroup = { 
            id, 
            description: descricao, 
        };

        return accessGroup;
    }
}

export default new AccessGroupMapper();