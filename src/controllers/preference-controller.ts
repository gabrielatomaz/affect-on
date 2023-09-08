import { Body, Get, Post, Route, Tags, Delete, Put, Patch, Path } from "tsoa";
import  { Preference } from "../models/models";
import { PreferenceService } from "../services/services";

@Tags("Preferências")
@Route("preferencia")
class PreferenceController {
    @Put("/id/:id")
    async update(@Path() id: number, @Body() preference: Preference): Promise<void> {
        PreferenceService.update(id, preference);
    }

    @Patch("/id/:id")
    async updateAllFields(@Path() id: number, @Body() preference: Preference): Promise<void> {
        PreferenceService.updateAllFields(id, preference);
    }

    @Get('/id/:id')
    async findById(@Path() id: number): Promise<Preference> {
        return PreferenceService.findById(id);
    }

    @Delete('/id/:id')
    async delete(@Path() id: number): Promise<void> {
        PreferenceService.delete(id);
    }


    @Get('/todos')
    async findAll(): Promise<Preference[]> {
        return PreferenceService.findAll();
    }

    @Post()
    async create(@Body() preference: Preference): Promise<void> {
        PreferenceService.create(preference);
    }

}

export default new PreferenceController();