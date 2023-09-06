import { UserRepository } from '../repositories/repositories';
import { User, UserLogin } from '../models/models'
import { UserMapper } from '../mappers/mappers'

class UserService {
    async getUserCredentials(user: UserLogin): Promise<User> {
        const { email, password }: User = user;

        const { rows: [userFound] } = await UserRepository
            .findUserByEmailAndPassword(email, password);

        return UserMapper.map(userFound);
    }

    async findAll(): Promise<User[]> {
        const { rows: users } = await UserRepository.findAll();

        return users.map(user => UserMapper.map(user));
    }

    async findByEmail(email?: string): Promise<User> {
        const { rows: [userFound] } = await UserRepository.findByEmail(email);

        return UserMapper.map(userFound);
    }

    async findBy(user: User): Promise<User[]> {
        const { rows: users } = await UserRepository.findBy(user);

        return users.map(user => UserMapper.map(user));
    }

    async upateAllFieldsBy(email: string, user: User): Promise<void> {
        UserRepository.updateAllFieldsBy(email, user);
    }

    async updateBy(email: string, user: User): Promise<void> {
        const {
            email: emailFound,
            name: nameFound,
            password: passwordFound,
            phone: phoneFound,
        }: User = await this.findByEmail(email);
        const { email: userEmail, name, password, phone } = user;
        const userToBeUpdated: User = {
            email: userEmail ? userEmail : emailFound,
            name: name ? name : nameFound,
            password: password ? password : passwordFound,
            phone: phone ? phone : phoneFound,
        };

        UserRepository.updateAllFieldsBy(email, userToBeUpdated);
    }

    async deleteBy(email: string): Promise<void> {
        UserRepository.delete(email);
    }

    async create(user: User): Promise<void> {
        UserRepository.insert(user);
    }
}

export default new UserService();