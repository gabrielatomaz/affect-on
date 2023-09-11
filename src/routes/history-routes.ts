import bodyParser from "body-parser";
import { Request, Response, Router } from "express"
import router from './router';
import { History } from "../models/models";
import { historyController } from "../controllers/controllers";
import { httpStatusMatcher } from "../utils/utils";

class HistoryRoutes {
    buildRoutes(): Router {
        const historyPath = '/historico';
        const historyByIdPath = `${historyPath}/id/:id`;

        const jsonParser = bodyParser.json();

        router.post(historyPath, jsonParser, this.createRoute);
        router.get(`${historyPath}/todos`, this.findAllRoute);
        router.get(historyByIdPath, this.findByIdRoute);
        router.delete(historyByIdPath, this.deleteRoute);
        router.patch(historyByIdPath, this.updateRoute);
        router.put(historyByIdPath, this.updateAllFieldsRoute);

        return router;
    }

    async updateAllFieldsRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const history: History = request.body as History;
        historyController.updateAllFields(id, history)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async updateRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const history: History = request.body as History;
        historyController.update(id, history)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findByIdRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const historyFound: History = await historyController.findById(id);
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(historyFound);
        response.status(responseHttpStatus).json(historyFound);
    }

    async deleteRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        historyController.delete(id)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findAllRoute(request: Request, response: Response): Promise<void> {
        const historiesFound: History[] = await historyController.findAll();
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(historiesFound);
        response.status(responseHttpStatus).json(historiesFound);
    }

    async createRoute(request: Request, response: Response): Promise<void> {
        const history: History = request.body as History;
        historyController.create(history)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }
}

export default new HistoryRoutes();