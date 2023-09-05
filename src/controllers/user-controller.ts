import { Response, Request } from 'express';
import { UserService } from '../services/services';
import { User } from '../models/models'

class UserController {
    async login(requet: Request, respone: Response) {
        const user: User = requet.body as User;
        UserService
            .findUser(user)
            .then((foundUser: User) => respone.json(foundUser));
    }
}

export default new UserController();