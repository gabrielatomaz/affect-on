import { Body, Get, Post, Route, Tags, Delete, Put, Patch, Path } from "tsoa";
import  { Reservation } from "../models/models";
import { ratingService } from "../services/services";

@Tags("Reservas")
@Route("reserva")
class ReservationController {
    @Put("/id/:id")
    async update(@Path() id: number, @Body() rating: Reservation): Promise<void> {
        ratingService.update(id, rating);
    }

    @Patch("/id/:id")
    async updateAllFields(@Path() id: number, @Body() rating: Reservation): Promise<void> {
        ratingService.updateAllFields(id, rating);
    }

    @Get('/id/:id')
    async findById(@Path() id: number): Promise<Reservation> {
        return ratingService.findById(id);
    }

    @Delete('/id/:id')
    async delete(@Path() id: number): Promise<void> {
        ratingService.delete(id);
    }


    @Get('/todos')
    async findAll(): Promise<Reservation[]> {
        return ratingService.findAll();
    }

    @Post()
    async create(@Body() rating: Reservation): Promise<void> {
        ratingService.create(rating);
    }

}

export default new ReservationController();