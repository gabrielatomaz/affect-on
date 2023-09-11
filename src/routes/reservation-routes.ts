import bodyParser from "body-parser";
import { Request, Response, Router } from "express"
import router from './router';
import { Reservation } from "../models/models";
import { reservationController } from "../controllers/controllers";
import { httpStatusMatcher } from "../utils/utils";

class ReservationRoutes {
    buildRoutes(): Router {
        const reservationPath = '/reserva';
        const reservationByIdPath = `${reservationPath}/id/:id`;
        const reservationByUserEmailPath = `${reservationPath}/usuario/:email`;

        const jsonParser = bodyParser.json();

        router.post(reservationPath, jsonParser, this.createRoute);
        router.get(`${reservationPath}/todos`, this.findAllRoute);
        router.get(reservationByIdPath, this.findByIdRoute);
        router.get(reservationByUserEmailPath, this.findReservationsByUserEmailRoute)
        router.delete(reservationByIdPath, this.deleteRoute);
        router.patch(reservationByIdPath, this.updateRoute);
        router.put(reservationByIdPath, this.updateAllFieldsRoute);

        return router;
    }

    async findReservationsByUserEmailRoute(request: Request, response: Response): Promise<void> {
        const email: string = request.params.email as string;
        const reservationsFound: Reservation[] = await reservationController
            .findReservationsByUserEmail(email);
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(reservationsFound);
        response.status(responseHttpStatus).json(reservationsFound);
    }

    async updateAllFieldsRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const reservation: Reservation = request.body as Reservation;
        reservationController.updateAllFields(id, reservation)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async updateRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const reservation: Reservation = request.body as Reservation;
        reservationController.update(id, reservation)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findByIdRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        const reservationFound: Reservation = await reservationController.findById(id);
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(reservationFound);
        response.status(responseHttpStatus).json(reservationFound);
    }

    async deleteRoute(request: Request, response: Response): Promise<void> {
        const id: number = parseInt(request.params.id as string);
        reservationController.delete(id)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }

    async findAllRoute(request: Request, response: Response): Promise<void> {
        const reservationsFound: Reservation[] = await reservationController.findAll();
        const responseHttpStatus = httpStatusMatcher.isOkOrNotFound(reservationsFound);
        response.status(responseHttpStatus).json(reservationsFound);
    }

    async createRoute(request: Request, response: Response): Promise<void> {
        const reservation: Reservation = request.body as Reservation;
        reservationController.create(reservation)
            .then(() => response.status(201).send())
            .catch(() => response.status(400).send());
    }
}

export default new ReservationRoutes();