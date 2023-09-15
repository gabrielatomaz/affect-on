import bodyParser from "body-parser";
import { Request, Response, Router } from "express"
import router from './router';
import { Rating, RatingHosting } from "../models/models";
import { ratingController } from "../controllers/controllers";
import { httpStatusMatcherUtils } from "../utils/utils";

class RatingRoutes {
    buildRoutes(): Router {
        const ratingPath = '/avaliacao';
        const ratingByIdPath = `${ratingPath}/id/:id`;
        const ratingByClientCPFPath = `${ratingPath}/cliente/:cpf`;

        const jsonParser = bodyParser.json();

        router.post(ratingPath, jsonParser, this.createRoute);
        router.get(`${ratingPath}/todos`, this.findAllRoute);
        router.get(ratingByIdPath, this.findByIdRoute);
        router.get(ratingByClientCPFPath, this.findRatingsByClientCPFRoute);
        router.delete(ratingByIdPath, this.deleteRoute);
        router.patch(ratingByIdPath, this.updateRoute);
        router.put(ratingByIdPath, this.updateAllFieldsRoute);

        return router;
    }

    async findRatingsByClientCPFRoute(request: Request, response: Response): Promise<void> {
        const cpf: string = request.params.cpf as string;
        const ratingsFound: RatingHosting[] = await ratingController
            .findRatingsByClientCPF(cpf);
        const responseHttpStatus = httpStatusMatcherUtils.isOkOrNotFound(ratingsFound);
        response.status(responseHttpStatus).json(ratingsFound);
    }

    async updateAllFieldsRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const rating: Rating = request.body as Rating;
        ratingController.updateAllFields(id, rating)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async updateRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const rating: Rating = request.body as Rating;
        ratingController.update(id, rating)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findByIdRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const ratingFound: Rating = await ratingController.findById(id);
        const responseHttpStatus = httpStatusMatcherUtils.isOkOrNotFound(ratingFound);
        response.status(responseHttpStatus).json(ratingFound);
    }

    async deleteRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        ratingController.delete(id)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findAllRoute(request: Request, response: Response): Promise<void> {
        const ratingsFound: Rating[] = await ratingController.findAll();
        const responseHttpStatus = httpStatusMatcherUtils.isOkOrNotFound(ratingsFound);
        response.status(responseHttpStatus).json(ratingsFound);
    }

    async createRoute(request: Request, response: Response): Promise<void> {
        const rating: Rating = request.body as Rating;
        ratingController.create(rating)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }
}

export default new RatingRoutes();