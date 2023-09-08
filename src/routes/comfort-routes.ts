import bodyParser from "body-parser";
import { Request, Response, Router } from "express"
import router from './router';
import { Comfort } from "../models/models";
import { comfortController } from "../controllers/controllers";
import { httpStatusMatcher } from "../utils/utils";

class ComfortRoutes {
    buildRoutes(): Router {
        const comfortPath = '/comodidade';
        const comfortByIdPath = `${comfortPath}/id/:id`;

        const jsonParser = bodyParser.json();

        router.post(comfortPath, jsonParser, this.createRoute);
        router.get(`${comfortPath}/todos`, this.findAllRoute);
        router.get(comfortByIdPath, this.findByIdRoute);
        router.delete(comfortByIdPath, this.deleteRoute);
        router.patch(comfortByIdPath, this.updateRoute);
        router.put(comfortByIdPath, this.updateAllFieldsRoute);

        return router;
    }

    async updateAllFieldsRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const comfort: Comfort = request.body as Comfort;
        comfortController.updateAllFields(id, comfort)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async updateRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const comfort: Comfort = request.body as Comfort;
        comfortController.update(id, comfort)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findByIdRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const comfortFound: Comfort = await comfortController.findById(id);
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(comfortFound);
        response.status(responseHttpStatus).json(comfortFound);
    }

    async deleteRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        comfortController.delete(id)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findAllRoute(request: Request, response: Response): Promise<void> {
        const comfortsFound: Comfort[] = await comfortController.findAll();
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(comfortsFound);
        response.status(responseHttpStatus).json(comfortsFound);
    }

    async createRoute(request: Request, response: Response): Promise<void> {
        const comfort: Comfort = request.body as Comfort;
        comfortController.create(comfort)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }
}

export default new ComfortRoutes();