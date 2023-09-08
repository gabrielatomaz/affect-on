import { userController } from '../controllers/controllers'
import { Response, Request } from 'express';
import bodyParser from 'body-parser';
import router from './router';
import { Router } from 'express';
import { User, UserLogin } from '../models/models';
import { httpStatusMatcher } from '../utils/utils';

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
        const loggedUser: User = await userController.login(user);

        const responseStatus = httpStatusMatcher.isOkOrNotFound(loggedUser);
        response.status(responseStatus).json(loggedUser);
    }

    private async findAllRoute(request: Request, response: Response): Promise<void> {
        const usersFound: User[] = await userController.findAll();

        const responseStatus = httpStatusMatcher.isOkOrNotFound(usersFound);
        response.status(responseStatus).json(usersFound);
    }

    private async findByEmailRoute(request: Request, response: Response): Promise<void> {
        const email: string = request.params.email as string;
        const userFound: User = await userController.findByEmail(email);

        const responseStatus = httpStatusMatcher.isOkOrNotFound(userFound);
        response.status(responseStatus).json(userFound);
    }

    private async findByRoute(request: Request, response: Response): Promise<void> {
        const user: User = request.query as User;
        const usersFound: User[] = await userController.findBy(user);

        const responseStatus = httpStatusMatcher.isOkOrNotFound(usersFound);
        response.status(responseStatus).json(usersFound);
    }

    private async createRoute(request: Request, response: Response): Promise<void> {
        const user: User = request.body as User;
        userController.create(user)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send())
    }

    private async deleteRoute(request: Request, response: Response): Promise<void> {
        const email: string = request.params.email as string;
        userController.deleteBy(email)
            .then(() => response.status(200).send())
            .catch(() => response.status(400).send());
    }

    private async updateRoute(request: Request, response: Response): Promise<void> {
        const email: string = request.params.email as string;
        const user: User = request.body as User;
        userController.updateBy(email, user)
            .then(() => response.status(200).send())
            .catch(() => response.status(400).send());
    }

    private async updateAllFieldsRoute(request: Request, response: Response): Promise<void> {
        const email: string = request.params.email as string;
        const user: User = request.body as User;
        userController.upateAllFieldsBy(email, user)
            .then(() => response.status(200).send())
            .catch(() => response.status(400).send());
    }
}

export default new UserRoutes();
