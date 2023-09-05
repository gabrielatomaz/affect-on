import { Response, Request } from 'express';
import { UserService } from '../services/services';
import { User } from '../models/models'

class UserController {
    async getUser(requet: Request, respone: Response) {
        const user: User = {
            email: 'usuario1@example.com',
            password: 'senha1',
        };

        UserService
            .findUser(user)
            .then((foundUser: User) => respone.send(foundUser));
    }
}

export default new UserController();