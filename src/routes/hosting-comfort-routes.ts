import bodyParser from "body-parser";
import { Request, Response, Router } from "express"
import router from './router';
import { HostingComfort } from "../models/models";
import { hostingComfortController } from "../controllers/controllers";
import { httpStatusMatcher } from "../utils/utils";

class HostingComfortRoutes {
    buildRoutes(): Router {
        const hostingComfortPath = '/local-de-hospedagem-comodidade';
        const hostingComfortByIdPath = `${hostingComfortPath}/id-local-de-hospedagem/:idLocalDeHospedagem/comodidade/:idComodidade`;

        const jsonParser = bodyParser.json();

        router.post(hostingComfortPath, jsonParser, this.createRoute);
        router.get(`${hostingComfortPath}/todos`, this.findAllRoute);
        router.get(hostingComfortByIdPath, this.findByIdRoute);
        router.delete(hostingComfortByIdPath, this.deleteRoute);

        return router;
    }

    async findByIdRoute(request: Request, response: Response): Promise<void> {
        const idGroup: number = parseInt(request.params.idLocalDeHospedagem as string);
        const idPermissionType: number = parseInt(request.params.idComodidade as string);
        const hostingComfortFound: HostingComfort =
            await hostingComfortController.findByIds(idGroup, idPermissionType);
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(hostingComfortFound);
        response.status(responseHttpStatus).json(hostingComfortFound);
    }

    async deleteRoute(request: Request, response: Response): Promise<void> {
        const idGroup: number = parseInt(request.params.idLocalDeHospedagem as string);
        const idPermissionType: number = parseInt(request.params.idComodidade as string);

        hostingComfortController.delete(idGroup, idPermissionType)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findAllRoute(request: Request, response: Response): Promise<void> {
        const hostingComfortsFound: HostingComfort[] = await hostingComfortController.findAll();
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(hostingComfortsFound);
        response.status(responseHttpStatus).json(hostingComfortsFound);
    }

    async createRoute(request: Request, response: Response): Promise<void> {
        const hostingComfort: HostingComfort = request.body as HostingComfort;
        hostingComfortController.create(hostingComfort)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }
}

export default new HostingComfortRoutes();