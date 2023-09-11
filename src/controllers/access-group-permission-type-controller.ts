import { Body, Get, Post, Route, Tags, Delete, Put, Patch, Path } from "tsoa";
import  { AccessGroupPermissionType } from "../models/models";
import { accessGroupPermissionTypeService } from "../services/services";

@Tags("Grupo de Acessos - Tipos de Permissão")
@Route("grupo-de-acesso-tipo-permissao")
class AccessGroupPermissionTypeController {
    @Get('/id-grupo/:idGrupo/id-tipo-permissao/:idTipoPermissao')
    async findByIds(@Path('idGrupo') idGroup: number, @Path('idTipoPermissao') idPermissionType: number): Promise<AccessGroupPermissionType> {
        return accessGroupPermissionTypeService.findByIds(idGroup, idPermissionType);
    }

    @Delete('/id-grupo/:idGrupo/id-tipo-permissao/:idTipoPermissao')
    async delete(@Path('idGrupo') idGroup: number, @Path('idTipoPermissao') idPermissionType: number): Promise<void> {
        accessGroupPermissionTypeService.delete(idGroup, idPermissionType);
    }

    @Get('/todos')
    async findAll(): Promise<AccessGroupPermissionType[]> {
        return accessGroupPermissionTypeService.findAll();
    }

    @Post()
    async create(@Body() accessGroupPermissionType: AccessGroupPermissionType): Promise<void> {
        accessGroupPermissionTypeService.create(accessGroupPermissionType);
    }

}

export default new AccessGroupPermissionTypeController();