import bodyParser from "body-parser";
import { Request, Response, Router } from "express"
import router from './router';
import { AccessGroup } from "../models/models";
import { accessGroupController } from "../controllers/controllers";
import { httpStatusMatcherUtils } from "../utils/utils";

class AccessGroupRoutes {
    buildRoutes(): Router {
        const accessGroupPath = '/grupo-de-acesso';
        const accessGroupByIdPath = `${accessGroupPath}/id/:id`;

        const jsonParser = bodyParser.json();

        router.post(accessGroupPath, jsonParser, this.createRoute);
        router.get(`${accessGroupPath}/todos`, this.findAllRoute);
        router.get(accessGroupByIdPath, this.findByIdRoute);
        router.delete(accessGroupByIdPath, this.deleteRoute);
        router.put(accessGroupByIdPath, this.updateAllFieldsRoute);

        return router;
    }

    async updateAllFieldsRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const accessGroup: AccessGroup = request.body as AccessGroup;
        accessGroupController.updateAllFields(id, accessGroup)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findByIdRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const accessGroupFound: AccessGroup = await accessGroupController.findById(id);
        const responseHttpStatus = httpStatusMatcherUtils.isOkOrNotFound(accessGroupFound);
        response.status(responseHttpStatus).json(accessGroupFound);
    }

    async deleteRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        accessGroupController.delete(id)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findAllRoute(request: Request, response: Response): Promise<void> {
        const accessGroupsFound: AccessGroup[] = await accessGroupController.findAll();
        const responseHttpStatus = httpStatusMatcherUtils.isOkOrNotFound(accessGroupsFound);
        response.status(responseHttpStatus).json(accessGroupsFound);
    }

    async createRoute(request: Request, response: Response): Promise<void> {
        const accessGroup: AccessGroup = request.body as AccessGroup;
        accessGroupController.create(accessGroup)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }
}

export default new AccessGroupRoutes();