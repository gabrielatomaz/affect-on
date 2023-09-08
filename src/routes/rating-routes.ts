import bodyParser from "body-parser";
import { Request, Response, Router } from "express"
import router from './router';
import { Rating } from "../models/models";
import { RatingController } from "../controllers/controllers";
import { HttpStatusMatcher } from "../utils/utils";

class RatingRoutes {
    buildRoutes(): Router {
        const ratingPath = '/avaliacao';
        const ratingByIdPath = `${ratingPath}/id/:id`;

        const jsonParser = bodyParser.json();

        router.post(ratingPath, jsonParser, this.createRoute);
        router.get(`${ratingPath}/todos`, this.findAllRoute);
        router.get(ratingByIdPath, this.findByIdRoute);
        router.delete(ratingByIdPath, this.deleteRoute);
        router.patch(ratingByIdPath, this.updateRoute);
        router.put(ratingByIdPath, this.updateAllFieldsRoute);

        return router;
    }

    async updateAllFieldsRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const rating: Rating = request.body as Rating;
        RatingController.updateAllFields(id, rating)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async updateRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const rating: Rating = request.body as Rating;
        RatingController.update(id, rating)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findByIdRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const ratingFound: Rating = await RatingController.findById(id);
        const responseHttpStatus = HttpStatusMatcher.isOkOrNotFound(ratingFound);
        response.status(responseHttpStatus).json(ratingFound);
    }

    async deleteRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        RatingController.delete(id)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findAllRoute(request: Request, response: Response): Promise<void> {
        const ratingsFound: Rating[] = await RatingController.findAll();
        const responseHttpStatus = HttpStatusMatcher.isOkOrNotFound(ratingsFound);
        response.status(responseHttpStatus).json(ratingsFound);
    }

    async createRoute(request: Request, response: Response): Promise<void> {
        const rating: Rating = request.body as Rating;
        RatingController.create(rating)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }
}

export default new RatingRoutes();