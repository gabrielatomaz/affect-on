import { UserEntity } from "../entities/entities";
import { User } from "../models/models";

class UserMapper {

    map(entityUser: UserEntity): User {
        if (!entityUser) return {};

        const { email, senha, telefone, nome, id_grupo }: UserEntity = entityUser
        const user: User = {
            email,
            password: senha,
            phone: telefone,
            name: nome,
            groupId: id_grupo,
        };

        return user;
    }
}

export default new UserMapper();