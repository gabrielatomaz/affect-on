import { Body, Get, Post, Route, Tags, Delete, Put, Patch, Path } from "tsoa";
import  { Preference, PreferenceComfortCategory } from "../models/models";
import { preferenceService } from "../services/services";

@Tags("Preferências")
@Route("preferencia")
class PreferenceController {
    @Get('/cliente/:cpf')
    async findPreferencesByClientCPF(cpf: string): Promise<PreferenceComfortCategory[]> {
        return preferenceService.findPreferencesByClientCPF(cpf);
    }
    @Put("/id/:id")
    async update(@Path() id: number, @Body() preference: Preference): Promise<void> {
        preferenceService.update(id, preference);
    }

    @Patch("/id/:id")
    async updateAllFields(@Path() id: number, @Body() preference: Preference): Promise<void> {
        preferenceService.updateAllFields(id, preference);
    }

    @Get('/id/:id')
    async findById(@Path() id: number): Promise<Preference> {
        return preferenceService.findById(id);
    }

    @Delete('/id/:id')
    async delete(@Path() id: number): Promise<void> {
        preferenceService.delete(id);
    }


    @Get('/todos')
    async findAll(): Promise<Preference[]> {
        return preferenceService.findAll();
    }

    @Post()
    async create(@Body() preference: Preference): Promise<void> {
        preferenceService.create(preference);
    }

}

export default new PreferenceController();