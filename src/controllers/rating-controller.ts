import { Body, Get, Post, Route, Tags, Delete, Put, Patch, Path } from "tsoa";
import  { Rating } from "../models/models";
import { RatingService } from "../services/services";

@Tags("Avaliações")
@Route("avaliacao")
class RatingController {
    @Put("/id/:id")
    async update(@Path() id: number, @Body() rating: Rating): Promise<void> {
        RatingService.update(id, rating);
    }

    @Patch("/id/:id")
    async updateAllFields(@Path() id: number, @Body() rating: Rating): Promise<void> {
        RatingService.updateAllFields(id, rating);
    }

    @Get('/id/:id')
    async findById(@Path() id: number): Promise<Rating> {
        return RatingService.findById(id);
    }

    @Delete('/id/:id')
    async delete(@Path() id: number): Promise<void> {
        RatingService.delete(id);
    }


    @Get('/todos')
    async findAll(): Promise<Rating[]> {
        return RatingService.findAll();
    }

    @Post()
    async create(@Body() rating: Rating): Promise<void> {
        RatingService.create(rating);
    }

}

export default new RatingController();