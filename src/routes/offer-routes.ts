import bodyParser from "body-parser";
import { Request, Response, Router } from "express"
import router from './router';
import { Offer } from "../models/models";
import { offerController } from "../controllers/controllers";
import { httpStatusMatcherUtils } from "../utils/utils";

class OfferRoutes {
    buildRoutes(): Router {
        const offerPath = '/oferta';
        const offerByIdPath = `${offerPath}/id/:id`;
        const offerByHostEmail = `${offerPath}/hospedeiro/:email`;

        const jsonParser = bodyParser.json();

        router.post(offerPath, jsonParser, this.createRoute);
        router.get(`${offerPath}/todos`, this.findAllRoute);
        router.get(offerByIdPath, this.findByIdRoute);
        router.get(offerByHostEmail, this.findOffersByHostEmailRoute)
        router.delete(offerByIdPath, this.deleteRoute);
        router.patch(offerByIdPath, this.updateRoute);
        router.put(offerByIdPath, this.updateAllFieldsRoute);

        return router;
    }
    async findOffersByHostEmailRoute(request: Request, response: Response): Promise<void> {
        const email: string = request.params.email as string;
        const offersFound: Offer[] = await offerController.findOffersByHostEmailRoute(email);
        const responseHttpStatus = httpStatusMatcherUtils.isOkOrNotFound(offersFound);
        response.status(responseHttpStatus).json(offersFound);
    }

    async updateAllFieldsRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const offer: Offer = request.body as Offer;
        offerController.updateAllFields(id, offer)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async updateRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const offer: Offer = request.body as Offer;
        offerController.update(id, offer)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findByIdRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const offerFound: Offer = await offerController.findById(id);
        const responseHttpStatus = httpStatusMatcherUtils.isOkOrNotFound(offerFound);
        response.status(responseHttpStatus).json(offerFound);
    }

    async deleteRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        offerController.delete(id)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findAllRoute(request: Request, response: Response): Promise<void> {
        const offersFound: Offer[] = await offerController.findAll();
        const responseHttpStatus = httpStatusMatcherUtils.isOkOrNotFound(offersFound);
        response.status(responseHttpStatus).json(offersFound);
    }

    async createRoute(request: Request, response: Response): Promise<void> {
        const offer: Offer = request.body as Offer;
        offerController.create(offer)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }
}

export default new OfferRoutes();