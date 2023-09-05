import { Response, Request } from 'express';
import { UserService } from '../services/services';
import { User, UserLogin } from '../models/models';
import { Post, Route, Body, Tags } from "tsoa";

@Route("usuario")
@Tags("Usuários")
class UserController {
    @Post("/login")
    login(@Body() user: UserLogin): Promise<User> {
        return UserService.getUserCredentials(user);
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