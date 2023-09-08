import { Body, Get, Post, Route, Tags, Delete, Put, Patch, Path } from "tsoa";
import { Client } from "../models/models";
import { clientService } from "../services/services";

@Tags("Clientes")
@Route("cliente")
class ClientController {
    @Put("/email/:email")
    async update(@Path() email: string, @Body() client: Client): Promise<void> {
        clientService.update(email, client);
    }

    @Patch("/email/:email")
    async updateAllFields(@Path() email: string, @Body() client: Client): Promise<void> {
        clientService.updateAllFields(email, client);
    }

    @Get('/email/:email')
    async findById(@Path() email: string): Promise<Client> {
        return clientService.findById(email);
    }

    @Delete('/email/:email')
    async delete(@Path() email: string): Promise<void> {
        clientService.delete(email);
    }


    @Get('/todos')
    async findAll(): Promise<Client[]> {
        return clientService.findAll();
    }

    @Post()
    async create(@Body() client: Client): Promise<void> {
        clientService.create(client);
    }

}

export default new ClientController();