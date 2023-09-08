import { Body, Get, Post, Route, Tags, Delete, Put, Patch, Path } from "tsoa";
import  { Client } from "../models/models";
import { ClientService } from "../services/services";

@Tags("Clientes")
@Route("cliente")
class ClientController {
    @Put("/email/:email")
    async update(@Path() email: string, @Body() client: Client): Promise<void> {
        ClientService.update(email, client);
    }

    @Patch("/email/:email")
    async updateAllFields(@Path() email: string, @Body() client: Client): Promise<void> {
        ClientService.updateAllFields(email, client);
    }

    @Get('/email/:email')
    async findById(@Path() email: string): Promise<Client> {
        return ClientService.findById(email);
    }

    @Delete('/email/:email')
    async delete(@Path() email: string): Promise<void> {
        ClientService.delete(email);
    }


    @Get('/todos')
    async findAll(): Promise<Client[]> {
        return ClientService.findAll();
    }

    @Post()
    async create(@Body() client: Client): Promise<void> {
        ClientService.create(client);
    }

}

export default new ClientController();