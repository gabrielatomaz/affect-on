import { Body, Get, Post, Route, Tags, Delete, Put, Patch, Path } from "tsoa";
import  { PermissionType } from "../models/models";
import { permissionTypeService } from "../services/services";

@Tags("Tipos de Permissão")
@Route("tipo-de-permissao")
class PermissionTypeController {
    @Patch("/id/:id")
    async updateAllFields(@Path() id: number, @Body() permissionType: PermissionType): Promise<void> {
        permissionTypeService.updateAllFields(id, permissionType);
    }

    @Get('/id/:id')
    async findById(@Path() id: number): Promise<PermissionType> {
        return permissionTypeService.findById(id);
    }

    @Delete('/id/:id')
    async delete(@Path() id: number): Promise<void> {
        permissionTypeService.delete(id);
    }


    @Get('/todos')
    async findAll(): Promise<PermissionType[]> {
        return permissionTypeService.findAll();
    }

    @Post()
    async create(@Body() permissionType: PermissionType): Promise<void> {
        permissionTypeService.create(permissionType);
    }

}

export default new PermissionTypeController();