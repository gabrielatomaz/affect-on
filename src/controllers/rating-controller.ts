import { Body, Get, Post, Route, Tags, Delete, Put, Patch, Path } from "tsoa";
import  { Rating } from "../models/models";
import { ratingService } from "../services/services";

@Tags("Avaliações")
@Route("avaliacao")
class RatingController {
    @Put("/id/:id")
    async update(@Path() id: number, @Body() rating: Rating): Promise<void> {
        ratingService.update(id, rating);
    }

    @Patch("/id/:id")
    async updateAllFields(@Path() id: number, @Body() rating: Rating): Promise<void> {
        ratingService.updateAllFields(id, rating);
    }

    @Get('/id/:id')
    async findById(@Path() id: number): Promise<Rating> {
        return ratingService.findById(id);
    }

    @Delete('/id/:id')
    async delete(@Path() id: number): Promise<void> {
        ratingService.delete(id);
    }


    @Get('/todos')
    async findAll(): Promise<Rating[]> {
        return ratingService.findAll();
    }

    @Post()
    async create(@Body() rating: Rating): Promise<void> {
        ratingService.create(rating);
    }

}

export default new RatingController();