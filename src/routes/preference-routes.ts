import bodyParser from "body-parser";
import { Request, Response, Router } from "express"
import router from './router';
import Preference from "../models/prefence";
import { PreferenceController } from "../controllers/controllers";

class PreferenceRoutes {
    buildRoutes(): Router {
        const preferencePath = '/preferencia';
        const preferenceByIdPath = `${preferencePath}/id/:id`;

        const jsonParser = bodyParser.json();

        router.post(preferencePath, jsonParser, this.createRoute);
        router.get(preferencePath, this.findAllRoute);
        router.get(preferencePath, this.findByIdRoute);
        router.delete(preferenceByIdPath, this.deleteRoute);
        router.patch(preferenceByIdPath, this.updateRoute);
        router.put(preferenceByIdPath, this.updateAllFieldsRoute);

        return router;
    }

    updateAllFieldsRoute(request: Request, response: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }

    updateRoute(request: Request, response: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }

    findByIdRoute(request: Request, response: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }

    deleteRoute(request: Request, response: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }

    findAllRoute(request: Request, response: Response): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async createRoute(request: Request, response: Response): Promise<void> {
        const preference: Preference = request.body as Preference;

        console.log(preference)
        PreferenceController.create(preference)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send())
    }
}

export default new PreferenceRoutes();