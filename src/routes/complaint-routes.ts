import bodyParser from "body-parser";
import { Request, Response, Router } from "express"
import router from './router';
import { Complaint } from "../models/models";
import { complaintController } from "../controllers/controllers";
import { httpStatusMatcher } from "../utils/utils";

class ComplaintRoutes {
    buildRoutes(): Router {
        const complaintPath = '/denuncia';
        const complaintByIdPath = `${complaintPath}/id/:id`;
        const complaintByClientCPF = `${complaintPath}/cliente/:cpf`;

        const jsonParser = bodyParser.json();

        router.post(complaintPath, jsonParser, this.createRoute);
        router.get(`${complaintPath}/todos`, this.findAllRoute);
        router.get(complaintByIdPath, this.findByIdRoute);
        router.get(complaintByClientCPF, this.findComplaintsByClientCPFRoute);
        router.delete(complaintByIdPath, this.deleteRoute);
        router.patch(complaintByIdPath, this.updateRoute);
        router.put(complaintByIdPath, this.updateAllFieldsRoute);

        return router;
    }

    async findComplaintsByClientCPFRoute(request: Request, response: Response): Promise<void> {
        const cpf: string = request.params.cpf as string;
        const complaintsFound: Complaint[] = await complaintController
            .findComplaintsByClientCPF(cpf);
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(complaintsFound);
        response.status(responseHttpStatus).json(complaintsFound);
    }

    async updateAllFieldsRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const complaint: Complaint = request.body as Complaint;
        complaintController.updateAllFields(id, complaint)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async updateRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const complaint: Complaint = request.body as Complaint;
        complaintController.update(id, complaint)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findByIdRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const complaintFound: Complaint = await complaintController.findById(id);
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(complaintFound);
        response.status(responseHttpStatus).json(complaintFound);
    }

    async deleteRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        complaintController.delete(id)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findAllRoute(request: Request, response: Response): Promise<void> {
        const complaintsFound: Complaint[] = await complaintController.findAll();
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(complaintsFound);
        response.status(responseHttpStatus).json(complaintsFound);
    }

    async createRoute(request: Request, response: Response): Promise<void> {
        const complaint: Complaint = request.body as Complaint;
        complaintController.create(complaint)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }
}

export default new ComplaintRoutes();