import { Body, Get, Post, Route, Tags, Delete, Put, Patch, Path } from "tsoa";
import { Reservation } from "../models/models";
import { reservationService } from "../services/services";

@Tags("Reservas")
@Route("reserva")
class ReservationController {
    @Get("/usuario/:email")
    findReservationsByUserEmail(email: string): Promise<Reservation[]> {
        return reservationService.findReservationsByUserEmail(email);
    }

    @Put("/id/:id")
    async update(@Path() id: number, @Body() reservation: Reservation): Promise<void> {
        reservationService.update(id, reservation);
    }

    @Patch("/id/:id")
    async updateAllFields(@Path() id: number, @Body() reservation: Reservation): Promise<void> {
        reservationService.updateAllFields(id, reservation);
    }

    @Get('/id/:id')
    async findById(@Path() id: number): Promise<Reservation> {
        return reservationService.findById(id);
    }

    @Delete('/id/:id')
    async delete(@Path() id: number): Promise<void> {
        reservationService.delete(id);
    }


    @Get('/todos')
    async findAll(): Promise<Reservation[]> {
        return reservationService.findAll();
    }

    @Post()
    async create(@Body() reservation: Reservation): Promise<void> {
        reservationService.create(reservation);
    }

}

export default new ReservationController();