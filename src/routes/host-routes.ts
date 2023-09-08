import bodyParser from "body-parser";
import { Request, Response, Router } from "express"
import router from './router';
import { Host } from "../models/models";
import { hostController } from "../controllers/controllers";
import { httpStatusMatcher } from "../utils/utils";

class HostRoutes {
    buildRoutes(): Router {
        const hostPath = '/hospedeiro';
        const hostByIdPath = `${hostPath}/email/:email`;

        const jsonParser = bodyParser.json();

        router.post(hostPath, jsonParser, this.createRoute);
        router.get(`${hostPath}/todos`, this.findAllRoute);
        router.get(hostByIdPath, this.findByIdRoute);
        router.delete(hostByIdPath, this.deleteRoute);
        router.patch(hostByIdPath, this.updateRoute);
        router.put(hostByIdPath, this.updateAllFieldsRoute);

        return router;
    }

    async updateAllFieldsRoute(request: Request, response: Response): Promise<void> {
        const email: string = request.params.email as string;
        const host: Host = request.body as Host;
        hostController.updateAllFields(email, host)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async updateRoute(request: Request, response: Response): Promise<void> {
        const email: string = request.params.email as string;
        const host: Host = request.body as Host;
        hostController.update(email, host)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findByIdRoute(request: Request, response: Response): Promise<void> {
        const email: string = request.params.email as string;
        const hostFound: Host = await hostController.findById(email);
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(hostFound);
        response.status(responseHttpStatus).json(hostFound);
    }

    async deleteRoute(request: Request, response: Response): Promise<void> {
        const email: string = request.params.email as string;
        hostController.delete(email)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findAllRoute(request: Request, response: Response): Promise<void> {
        const hostsFound: Host[] = await hostController.findAll();
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(hostsFound);
        response.status(responseHttpStatus).json(hostsFound);
    }

    async createRoute(request: Request, response: Response): Promise<void> {
        const host: Host = request.body as Host;
        hostController.create(host)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }
}

export default new HostRoutes();