import { UserRepository } from '../repositories/repositories';
import { User } from '../models/models'

class UserService {
    async findUser(user: User): Promise<User> {
        const { email, password }: User = user;

        const { rows: [userFound] } = await UserRepository
            .findUserByEmailAndPassword(email, password);

        return userFound;
    }
}

export default new UserService();