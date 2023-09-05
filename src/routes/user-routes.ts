import { UserController } from '../controllers/controllers'
import bodyParser from 'body-parser';
import router from './router';
import { Router } from 'express';

class UserRoutes {
    setRoutes(): Router {
        const userPath = '/usuario';
        const jsonParser = bodyParser.json();

        router.post(`${userPath}/login`, jsonParser, UserController.login);
        router.get(`${userPath}/todos`, UserController.findAll)
        router.get(`${userPath}/email`, UserController.findByEmail)
        router.get(userPath, UserController.findBy)

        return router;
    }
}

export default new UserRoutes().setRoutes();
