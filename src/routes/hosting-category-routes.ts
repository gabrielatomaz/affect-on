import bodyParser from "body-parser";
import { Request, Response, Router } from "express"
import router from './router';
import { HostingCategory } from "../models/models";
import { hostingCategoryController } from "../controllers/controllers";
import { httpStatusMatcher } from "../utils/utils";

class HostingCategoryController {
    buildRoutes(): Router {
        const hostingCategoryPath = '/local-de-hospedagem-categoria';
        const hostingCategoryByIdPath = `${hostingCategoryPath}/id-local-de-hospedagem/:idLocalDeHospedagem/categoria/:idCategoria`;

        const jsonParser = bodyParser.json();

        router.post(hostingCategoryPath, jsonParser, this.createRoute);
        router.get(`${hostingCategoryPath}/todos`, this.findAllRoute);
        router.get(hostingCategoryByIdPath, this.findByIdRoute);
        router.delete(hostingCategoryByIdPath, this.deleteRoute);

        return router;
    }

    async findByIdRoute(request: Request, response: Response): Promise<void> {
        const idGroup: number = parseInt(request.params.idLocalDeHospedagem as string);
        const idPermissionType: number = parseInt(request.params.idCategoria as string);
        const hostingCategoryFound: HostingCategory =
            await hostingCategoryController.findByIds(idGroup, idPermissionType);
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(hostingCategoryFound);
        response.status(responseHttpStatus).json(hostingCategoryFound);
    }

    async deleteRoute(request: Request, response: Response): Promise<void> {
        const idGroup: number = parseInt(request.params.idLocalDeHospedagem as string);
        const idPermissionType: number = parseInt(request.params.idCategoria as string);

        hostingCategoryController.delete(idGroup, idPermissionType)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findAllRoute(request: Request, response: Response): Promise<void> {
        const hostingCategorysFound: HostingCategory[] = await hostingCategoryController.findAll();
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(hostingCategorysFound);
        response.status(responseHttpStatus).json(hostingCategorysFound);
    }

    async createRoute(request: Request, response: Response): Promise<void> {
        const hostingCategory: HostingCategory = request.body as HostingCategory;
        hostingCategoryController.create(hostingCategory)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }
}

export default new HostingCategoryController();