import { UserRepository } from '../repositories/repositories';
import { User, UserLogin } from '../models/models'

class UserService {
    async getUserCredentials(user: UserLogin): Promise<User> {
        const { email, password }: User = user;

        const { rows: [userFound] } = await UserRepository
            .findUserByEmailAndPassword(email, password);

        return userFound;
    }

    async findAll(): Promise<User[]> {
        const { rows: users } = await UserRepository.findAll();

        return users;
    }

    async findByEmail(email?: string): Promise<User> {
        const { rows: [userFound] } = await UserRepository.findByEmail(email);

        return userFound;
    }

    async findBy(user: User): Promise<User[]> {
        const { rows: users } = await UserRepository.findBy(user);
        
        return users;
    }
}

export default new UserService();