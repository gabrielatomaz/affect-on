import bodyParser from "body-parser";
import { Request, Response, Router } from "express"
import router from './router';
import { AccessGroupPermissionType } from "../models/models";
import { accessGroupPermissionTypeController } from "../controllers/controllers";
import { httpStatusMatcher } from "../utils/utils";

class AccessGroupPermissionTypeRoutes {
    buildRoutes(): Router {
        const accessGroupPermissionTypePath = '/grupo-de-acesso-tipo-permissao';
        const accessGroupPermissionTypeByIdPath = `${accessGroupPermissionTypePath}/id-grupo/:id-grupo/id-tipo-permissao/:id-tipo-permissao`;

        const jsonParser = bodyParser.json();

        router.post(accessGroupPermissionTypePath, jsonParser, this.createRoute);
        router.get(`${accessGroupPermissionTypePath}/todos`, this.findAllRoute);
        router.get(accessGroupPermissionTypeByIdPath, this.findByIdRoute);
        router.delete(accessGroupPermissionTypeByIdPath, this.deleteRoute);

        return router;
    }

    async findByIdRoute(request: Request, response: Response): Promise<void> {
        const idGroup: number = parseInt(request.params.idGrupo as string);
        const idPermissionType: number = parseInt(request.params.idTipoPermissao as string);
        const accessGroupPermissionTypeFound: AccessGroupPermissionType =
            await accessGroupPermissionTypeController.findByIds(idGroup, idPermissionType);
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(accessGroupPermissionTypeFound);
        response.status(responseHttpStatus).json(accessGroupPermissionTypeFound);
    }

    async deleteRoute(request: Request, response: Response): Promise<void> {
        const idGroup: number = parseInt(request.params.idGrupo as string);
        const idPermissionType: number = parseInt(request.params.idTipoPermissao as string);

        accessGroupPermissionTypeController.delete(idGroup, idPermissionType)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findAllRoute(request: Request, response: Response): Promise<void> {
        const accessGroupPermissionTypesFound: AccessGroupPermissionType[] = await accessGroupPermissionTypeController.findAll();
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(accessGroupPermissionTypesFound);
        response.status(responseHttpStatus).json(accessGroupPermissionTypesFound);
    }

    async createRoute(request: Request, response: Response): Promise<void> {
        const accessGroupPermissionType: AccessGroupPermissionType = request.body as AccessGroupPermissionType;
        accessGroupPermissionTypeController.create(accessGroupPermissionType)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }
}

export default new AccessGroupPermissionTypeRoutes();