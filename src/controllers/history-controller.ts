import { Body, Get, Post, Route, Tags, Delete, Put, Patch, Path } from "tsoa";
import  { History } from "../models/models";
import { historyService } from "../services/services";

@Tags("Históricos")
@Route("historico")
class HistoryController {
    @Put("/id/:id")
    async update(@Path() id: number, @Body() history: History): Promise<void> {
        historyService.update(id, history);
    }

    @Patch("/id/:id")
    async updateAllFields(@Path() id: number, @Body() history: History): Promise<void> {
        historyService.updateAllFields(id, history);
    }

    @Get('/id/:id')
    async findById(@Path() id: number): Promise<History> {
        return historyService.findById(id);
    }

    @Delete('/id/:id')
    async delete(@Path() id: number): Promise<void> {
        historyService.delete(id);
    }


    @Get('/todos')
    async findAll(): Promise<History[]> {
        return historyService.findAll();
    }

    @Post()
    async create(@Body() history: History): Promise<void> {
        historyService.create(history);
    }

}

export default new HistoryController();