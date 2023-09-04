import express from 'express';
import { UserController } from './controllers/controllers';

const routes = express.Router();

routes.get('/usuario', UserController.getUser);

export default routes;