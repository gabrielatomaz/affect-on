import { UserController } from '../controllers/controllers'
import { Response, Request } from 'express';
import bodyParser from 'body-parser';
import router from './router';
import { Router } from 'express';
import { User, UserLogin } from '../models/models';

class UserRoutes {
    setRoutes(): Router {
        const userPath = '/usuario';
        const jsonParser = bodyParser.json();

        router.post(`${userPath}/login`, jsonParser, this.loginRoute);
        router.get(`${userPath}/todos`, UserController.findAll)
        router.get(`${userPath}/email`, UserController.findByEmail)
        router.get(userPath, UserController.findBy)

        return router;
    }

    private async loginRoute(requet: Request, response: Response) {
        const user: UserLogin = requet.body as User;
        const loggedUser: User = await UserController.login(user);
        response.json(loggedUser);
    }
}

export default new UserRoutes().setRoutes();
