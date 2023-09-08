import { Body, Get, Post, Route, Tags, Delete, Put, Patch, Path } from "tsoa";
import  { Comfort } from "../models/models";
import { comfortService } from "../services/services";

@Tags("Comodidades")
@Route("comodidade")
class ComfortController {
    @Put("/id/:id")
    async update(@Path() id: number, @Body() comfort: Comfort): Promise<void> {
        comfortService.update(id, comfort);
    }

    @Patch("/id/:id")
    async updateAllFields(@Path() id: number, @Body() comfort: Comfort): Promise<void> {
        comfortService.updateAllFields(id, comfort);
    }

    @Get('/id/:id')
    async findById(@Path() id: number): Promise<Comfort> {
        return comfortService.findById(id);
    }

    @Delete('/id/:id')
    async delete(@Path() id: number): Promise<void> {
        comfortService.delete(id);
    }


    @Get('/todos')
    async findAll(): Promise<Comfort[]> {
        return comfortService.findAll();
    }

    @Post()
    async create(@Body() comfort: Comfort): Promise<void> {
        comfortService.create(comfort);
    }

}

export default new ComfortController();