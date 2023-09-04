import { UserRepository } from '../repositories/repositories';

class UserService {
    async findUser(user: User): Promise<User> {
        const { rows: [userFound] } = await UserRepository.findUser(user);
        console.log(userFound);
        return userFound;
    }
}

export default new UserService();