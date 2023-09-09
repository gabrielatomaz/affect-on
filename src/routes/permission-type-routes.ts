import bodyParser from "body-parser";
import { Request, Response, Router } from "express"
import router from './router';
import { PermissionType } from "../models/models";
import { permissionTypeController } from "../controllers/controllers";
import { httpStatusMatcher } from "../utils/utils";

class PermissionTypeRoutes {
    buildRoutes(): Router {
        const permissionTypePath = '/tipo-de-permissao';
        const permissionTypeByIdPath = `${permissionTypePath}/id/:id`;

        const jsonParser = bodyParser.json();

        router.post(permissionTypePath, jsonParser, this.createRoute);
        router.get(`${permissionTypePath}/todos`, this.findAllRoute);
        router.get(permissionTypeByIdPath, this.findByIdRoute);
        router.delete(permissionTypeByIdPath, this.deleteRoute);
        router.put(permissionTypeByIdPath, this.updateAllFieldsRoute);

        return router;
    }

    async updateAllFieldsRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const permissionType: PermissionType = request.body as PermissionType;
        permissionTypeController.updateAllFields(id, permissionType)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findByIdRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const permissionTypeFound: PermissionType = await permissionTypeController.findById(id);
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(permissionTypeFound);
        response.status(responseHttpStatus).json(permissionTypeFound);
    }

    async deleteRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        permissionTypeController.delete(id)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findAllRoute(request: Request, response: Response): Promise<void> {
        const permissionTypesFound: PermissionType[] = await permissionTypeController.findAll();
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(permissionTypesFound);
        response.status(responseHttpStatus).json(permissionTypesFound);
    }

    async createRoute(request: Request, response: Response): Promise<void> {
        const permissionType: PermissionType = request.body as PermissionType;
        permissionTypeController.create(permissionType)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }
}

export default new PermissionTypeRoutes();