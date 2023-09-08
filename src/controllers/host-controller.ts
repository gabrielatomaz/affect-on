import { Body, Get, Post, Route, Tags, Delete, Put, Patch, Path } from "tsoa";
import  { Host } from "../models/models";
import { HostService } from "../services/services";

@Tags("Hospedeiros")
@Route("hospedeiro")
class HostController {
    @Put("/email/:email")
    async update(@Path() email: string, @Body() host: Host): Promise<void> {
        HostService.update(email, host);
    }

    @Patch("/email/:email")
    async updateAllFields(@Path() email: string, @Body() host: Host): Promise<void> {
        HostService.updateAllFields(email, host);
    }

    @Get('/email/:email')
    async findById(@Path() email: string): Promise<Host> {
        return HostService.findById(email);
    }

    @Delete('/email/:email')
    async delete(@Path() email: string): Promise<void> {
        HostService.delete(email);
    }


    @Get('/todos')
    async findAll(): Promise<Host[]> {
        return HostService.findAll();
    }

    @Post()
    async create(@Body() host: Host): Promise<void> {
        HostService.create(host);
    }

}

export default new HostController();