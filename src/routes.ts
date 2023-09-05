import express from 'express';
import bodyParser from 'body-parser';
import { UserController } from './controllers/controllers';

const routes = express.Router();

var jsonParser = bodyParser.json()

routes.post('/login', jsonParser, UserController.login);

export default routes;