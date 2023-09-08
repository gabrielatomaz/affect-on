import { userRepository } from '../repositories/repositories';
import { User, UserLogin } from '../models/models'
import { userMapper } from '../mappers/mappers'

class UserService {
    async getUserCredentials(user: UserLogin): Promise<User> {
        const { email, password }: UserLogin = user;

        const { rows: [userFound] } = await userRepository
            .findUserByEmailAndPassword(email, password);

        return userMapper.map(userFound);
    }

    async findAll(): Promise<User[]> {
        const { rows: users } = await userRepository.findAll();

        return users.map(user => userMapper.map(user));
    }

    async findByEmail(email?: string): Promise<User> {
        const { rows: [userFound] } = await userRepository.findByEmail(email);

        return userMapper.map(userFound);
    }

    async findBy(user: User): Promise<User[]> {
        const { rows: users } = await userRepository.findBy(user);

        return users.map(user => userMapper.map(user));
    }

    async upateAllFieldsBy(email: string, user: User): Promise<void> {
        userRepository.updateAllFieldsBy(email, user);
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

        userRepository.updateAllFieldsBy(email, userToBeUpdated);
    }

    async deleteBy(email: string): Promise<void> {
        userRepository.delete(email);
    }

    async create(user: User): Promise<void> {
        userRepository.insert(user);
    }
}

export default new UserService();