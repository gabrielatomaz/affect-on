import bodyParser from "body-parser";
import { Request, Response, Router } from "express"
import router from './router';
import { Preference } from "../models/models";
import { PreferenceController } from "../controllers/controllers";
import { HttpStatusMatcher } from "../utils/utils";

class PreferenceRoutes {
    buildRoutes(): Router {
        const preferencePath = '/preferencia';
        const preferenceByIdPath = `${preferencePath}/id/:id`;

        const jsonParser = bodyParser.json();

        router.post(preferencePath, jsonParser, this.createRoute);
        router.get(`${preferencePath}/todos`, this.findAllRoute);
        router.get(preferenceByIdPath, this.findByIdRoute);
        router.delete(preferenceByIdPath, this.deleteRoute);
        router.patch(preferenceByIdPath, this.updateRoute);
        router.put(preferenceByIdPath, this.updateAllFieldsRoute);

        return router;
    }

    async updateAllFieldsRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const preference: Preference = request.body as Preference;
        PreferenceController.updateAllFields(id, preference)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async updateRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const preference: Preference = request.body as Preference;
        PreferenceController.update(id, preference)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findByIdRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const preferenceFound: Preference = await PreferenceController.findById(id);
        const responseHttpStatus = HttpStatusMatcher.isOkOrNotFound(preferenceFound);
        response.status(responseHttpStatus).json(preferenceFound);
    }

    async deleteRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        PreferenceController.delete(id)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findAllRoute(request: Request, response: Response): Promise<void> {
        const preferencesFound: Preference[] = await PreferenceController.findAll();
        const responseHttpStatus = HttpStatusMatcher.isOkOrNotFound(preferencesFound);
        response.status(responseHttpStatus).json(preferencesFound);
    }

    async createRoute(request: Request, response: Response): Promise<void> {
        const preference: Preference = request.body as Preference;
        PreferenceController.create(preference)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }
}

export default new PreferenceRoutes();