import bodyParser from "body-parser";
import { Request, Response, Router } from "express"
import router from './router';
import { Client } from "../models/models";
import { clientController } from "../controllers/controllers";
import { httpStatusMatcher } from "../utils/utils";

class ClientRoutes {
    buildRoutes(): Router {
        const clientPath = '/cliente';
        const clientByIdPath = `${clientPath}/email/:email`;

        const jsonParser = bodyParser.json();

        router.post(clientPath, jsonParser, this.createRoute);
        router.get(`${clientPath}/todos`, this.findAllRoute);
        router.get(clientByIdPath, this.findByIdRoute);
        router.delete(clientByIdPath, this.deleteRoute);
        router.patch(clientByIdPath, this.updateRoute);
        router.put(clientByIdPath, this.updateAllFieldsRoute);

        return router;
    }

    async updateAllFieldsRoute(request: Request, response: Response): Promise<void> {
        const email: string = request.params.email as string;
        const client: Client = request.body as Client;
        clientController.updateAllFields(email, client)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async updateRoute(request: Request, response: Response): Promise<void> {
        const email: string = request.params.email as string;
        const client: Client = request.body as Client;
        clientController.update(email, client)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findByIdRoute(request: Request, response: Response): Promise<void> {
        const email: string = request.params.email as string;
        const clientFound: Client = await clientController.findById(email);
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(clientFound);
        response.status(responseHttpStatus).json(clientFound);
    }

    async deleteRoute(request: Request, response: Response): Promise<void> {
        const email: string = request.params.email as string;
        clientController.delete(email)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findAllRoute(request: Request, response: Response): Promise<void> {
        const clientsFound: Client[] = await clientController.findAll();
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(clientsFound);
        response.status(responseHttpStatus).json(clientsFound);
    }

    async createRoute(request: Request, response: Response): Promise<void> {
        const client: Client = request.body as Client;
        clientController.create(client)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }
}

export default new ClientRoutes();