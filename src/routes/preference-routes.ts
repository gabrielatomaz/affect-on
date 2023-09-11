import bodyParser from "body-parser";
import { Request, Response, Router } from "express"
import router from './router';
import { Preference, PreferenceComfortCategory } from "../models/models";
import { preferenceController } from "../controllers/controllers";
import { httpStatusMatcher } from "../utils/utils";

class PreferenceRoutes {
    buildRoutes(): Router {
        const preferencePath = '/preferencia';
        const preferenceByIdPath = `${preferencePath}/id/:id`;
        const preferenceByClientCPF = `${preferencePath}/cliente/:cpf`;

        const jsonParser = bodyParser.json();

        router.post(preferencePath, jsonParser, this.createRoute);
        router.get(`${preferencePath}/todos`, this.findAllRoute);
        router.get(preferenceByIdPath, this.findByIdRoute);
        router.get(preferenceByClientCPF, this.findPreferencesByClientCPFRoute);
        router.delete(preferenceByIdPath, this.deleteRoute);
        router.patch(preferenceByIdPath, this.updateRoute);
        router.put(preferenceByIdPath, this.updateAllFieldsRoute);

        return router;
    }

    async findPreferencesByClientCPFRoute(request: Request, response: Response): Promise<void> {
        const cpf: string = request.params.cpf;
        const preferencesFound: PreferenceComfortCategory[] = await preferenceController
            .findPreferencesByClientCPF(cpf);
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(preferencesFound);
        response.status(responseHttpStatus).json(preferencesFound);
    }

    async updateAllFieldsRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const preference: Preference = request.body as Preference;
        preferenceController.updateAllFields(id, preference)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async updateRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const preference: Preference = request.body as Preference;
        preferenceController.update(id, preference)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findByIdRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const preferenceFound: Preference = await preferenceController.findById(id);
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(preferenceFound);
        response.status(responseHttpStatus).json(preferenceFound);
    }

    async deleteRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        preferenceController.delete(id)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findAllRoute(request: Request, response: Response): Promise<void> {
        const preferencesFound: Preference[] = await preferenceController.findAll();
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(preferencesFound);
        response.status(responseHttpStatus).json(preferencesFound);
    }

    async createRoute(request: Request, response: Response): Promise<void> {
        const preference: Preference = request.body as Preference;
        preferenceController.create(preference)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }
}

export default new PreferenceRoutes();