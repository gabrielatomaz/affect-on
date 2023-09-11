import bodyParser from "body-parser";
import { Request, Response, Router } from "express"
import router from './router';
import { Category } from "../models/models";
import { categoryController } from "../controllers/controllers";
import { httpStatusMatcher } from "../utils/utils";

class CategoryRoutes {
    buildRoutes(): Router {
        const categoryPath = '/categoria';
        const categoryByIdPath = `${categoryPath}/id/:id`;

        const jsonParser = bodyParser.json();

        router.post(categoryPath, jsonParser, this.createRoute);
        router.get(`${categoryPath}/todos`, this.findAllRoute);
        router.get(categoryByIdPath, this.findByIdRoute);
        router.delete(categoryByIdPath, this.deleteRoute);
        router.patch(categoryByIdPath, this.updateRoute);
        router.put(categoryByIdPath, this.updateAllFieldsRoute);

        return router;
    }

    async updateAllFieldsRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const category: Category = request.body as Category;
        categoryController.updateAllFields(id, category)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async updateRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const category: Category = request.body as Category;
        categoryController.update(id, category)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findByIdRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const categoryFound: Category = await categoryController.findById(id);
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(categoryFound);
        response.status(responseHttpStatus).json(categoryFound);
    }

    async deleteRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        categoryController.delete(id)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findAllRoute(request: Request, response: Response): Promise<void> {
        const categoriesFound: Category[] = await categoryController.findAll();
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(categoriesFound);
        response.status(responseHttpStatus).json(categoriesFound);
    }

    async createRoute(request: Request, response: Response): Promise<void> {
        const category: Category = request.body as Category;
        categoryController.create(category)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }
}

export default new CategoryRoutes();