import { UserController } from '../controllers/controllers'
import { Response, Request } from 'express';
import bodyParser from 'body-parser';
import router from './router';
import { Router } from 'express';
import { User, UserLogin } from '../models/models';
import { error } from 'console';

class UserRoutes {
    buildRoutes(): Router {
        const userPath = '/usuario';

        const jsonParser = bodyParser.json();

        const userByEmailPath = `${userPath}/email/:email`;

        router.post(`${userPath}/login`, jsonParser, this.loginRoute);
        router.post(`${userPath}`, jsonParser, this.createRoute);
        router.get(`${userPath}/todos`, this.findAllRoute);
        router.get(userByEmailPath, this.findByEmailRoute);
        router.get(`${userPath}`, this.findByRoute);
        router.delete(userByEmailPath, this.deleteRoute);
        router.patch(userByEmailPath, this.updateRoute);
        router.put(userByEmailPath, this.updateAllFieldsRoute);

        return router;
    }

    private async loginRoute(request: Request, response: Response): Promise<void> {
        const user: UserLogin = request.body as User;
        const loggedUser: User = await UserController.login(user);
        response.json(loggedUser);
    }

    private async findAllRoute(request: Request, response: Response): Promise<void> {
        const usersFound: User[] = await UserController.findAll();
        response.json(usersFound);
    }

    private async findByEmailRoute(request: Request, response: Response): Promise<void> {
        const email: string = request.params.email as string;
        const userFound: User = await UserController.findByEmail(email);
        response.json(userFound);
    }

    private async findByRoute(request: Request, response: Response): Promise<void> {
        const user: User = request.query as User;
        const usersFound: User[] = await UserController.findBy(user);
        response.json(usersFound);
    }

    private async createRoute(request: Request, response: Response): Promise<void> {
        const user: User = request.body as User;
        UserController.create(user)
            .then(() => response.status(201))
            .catch(() => response.status(400));
    }

    private async deleteRoute(request: Request, response: Response): Promise<void> {
        const email: string = request.params.email as string;
        const persistedUser: User = await UserController.deleteBy(email);
        response.json(persistedUser);
    }

    private async updateRoute(request: Request, response: Response): Promise<void> {
        const email: string = request.params.email as string;
        const user: User = request.body as User;
        const persistedUser: User = await UserController.updateBy(email, user);
        response.json(persistedUser);
    }

    private async updateAllFieldsRoute(request: Request, response: Response): Promise<void> {
        const email: string = request.params.email as string;
        const user: User = request.body as User;
        const persistedUser: User = await UserController.upateAllFieldsBy(email, user);
        response.json(persistedUser);
    }
}

export default new UserRoutes();
