import { Body, Get, Post, Route, Tags, Delete, Put, Patch, Path } from "tsoa";
import  { Hosting } from "../models/models";
import { hostingService } from "../services/services";

@Tags("Locais de Hospedagem")
@Route("local-de-hospedagem")
class HostingController {
    @Put("/id/:id")
    async update(@Path() id: number, @Body() hosting: Hosting): Promise<void> {
        hostingService.update(id, hosting);
    }

    @Patch("/id/:id")
    async updateAllFields(@Path() id: number, @Body() hosting: Hosting): Promise<void> {
        hostingService.updateAllFields(id, hosting);
    }

    @Get('/id/:id')
    async findById(@Path() id: number): Promise<Hosting> {
        return hostingService.findById(id);
    }

    @Delete('/id/:id')
    async delete(@Path() id: number): Promise<void> {
        hostingService.delete(id);
    }


    @Get('/todos')
    async findAll(): Promise<Hosting[]> {
        return hostingService.findAll();
    }

    @Post()
    async create(@Body() hosting: Hosting): Promise<void> {
        hostingService.create(hosting);
    }

}

export default new HostingController();