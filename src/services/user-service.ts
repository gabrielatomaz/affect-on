import { UserRepository } from '../repositories/repositories';
import { User } from '../models/models'

class UserService {
    async findUser(user: User): Promise<User> {
        const { rows: [userFound] } = await UserRepository.findUser(user);
        console.log(userFound);
        return userFound;
    }
}

export default new UserService();