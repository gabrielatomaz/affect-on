import { Body, Get, Post, Route, Tags, Delete, Put, Patch, Path } from "tsoa";
import  { Host } from "../models/models";
import { hostService } from "../services/services";

@Tags("Hospedeiros")
@Route("hospedeiro")
class HostController {
    @Put("/email/:email")
    async update(@Path() email: string, @Body() host: Host): Promise<void> {
        hostService.update(email, host);
    }

    @Patch("/email/:email")
    async updateAllFields(@Path() email: string, @Body() host: Host): Promise<void> {
        hostService.updateAllFields(email, host);
    }

    @Get('/email/:email')
    async findById(@Path() email: string): Promise<Host> {
        return hostService.findById(email);
    }

    @Delete('/email/:email')
    async delete(@Path() email: string): Promise<void> {
        hostService.delete(email);
    }


    @Get('/todos')
    async findAll(): Promise<Host[]> {
        return hostService.findAll();
    }

    @Post()
    async create(@Body() host: Host): Promise<void> {
        hostService.create(host);
    }

}

export default new HostController();