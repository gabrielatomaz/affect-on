import { Body, Get, Post, Route, Tags, Delete, Put, Patch, Path } from "tsoa";
import  { AccessGroup } from "../models/models";
import { accessGroupService } from "../services/services";

@Tags("Grupo de Acesso")
@Route("grupo-de-acesso")
class AccessGroupController {
    @Patch("/id/:id")
    async updateAllFields(@Path() id: number, @Body() accessGroup: AccessGroup): Promise<void> {
        accessGroupService.updateAllFields(id, accessGroup);
    }

    @Get('/id/:id')
    async findById(@Path() id: number): Promise<AccessGroup> {
        return accessGroupService.findById(id);
    }

    @Delete('/id/:id')
    async delete(@Path() id: number): Promise<void> {
        accessGroupService.delete(id);
    }


    @Get('/todos')
    async findAll(): Promise<AccessGroup[]> {
        return accessGroupService.findAll();
    }

    @Post()
    async create(@Body() accessGroup: AccessGroup): Promise<void> {
        accessGroupService.create(accessGroup);
    }

}

export default new AccessGroupController();