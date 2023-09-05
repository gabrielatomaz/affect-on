import { Response, Request, response } from 'express';
import { UserService } from '../services/services';
import { User } from '../models/models'

class UserController {
    login(requet: Request, response: Response): void {
        const user: User = requet.body as User;
        UserService
            .getUserCredentials(user)
            .then((foundUser: User) => response.json(foundUser));
    }

    findByEmail(requet: Request, response: Response): void {
        const { query } = requet;
        const { email }: User = query as User;

        UserService
            .findByEmail(email)
            .then((userFound: User) => response.json(userFound));
    }

    findAll(requet: Request, response: Response): void {
        UserService
            .findAll()
            .then((users: User[]) => response.json(users))
    }

    findBy(requet: Request, response: Response): void {
        const { query } = requet;
        const user: User = query as User;

        UserService
            .findBy(user)
            .then((userFound: User[]) => response.json(userFound));
    }
}

export default new UserController();