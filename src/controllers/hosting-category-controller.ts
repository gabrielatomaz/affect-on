import { Body, Get, Post, Route, Tags, Delete, Put, Patch, Path } from "tsoa";
import  { HostingCategory } from "../models/models";
import { hostingCategoryService } from "../services/services";

@Tags("Locais de Hospedagem - Categorias")
@Route("local-de-hospedagem-categoria")
class HostingCategoryController {
    @Get('/id-local-de-hospedagem/:idLocalDeHospedagem/categoria/:idCategoria')
    async findByIds(@Path('idLocalDeHospedagem') idHosting: number, @Path('idCategoria') idCategory: number): Promise<HostingCategory> {
        return hostingCategoryService.findByIds(idHosting, idCategory);
    }

    @Delete('/id-grupo/:idLocalDeHospedagem/categoria/:idCategoria')
    async delete(@Path('idLocalDeHospedagem') idHosting: number, @Path('idCategoria') idCategory: number): Promise<void> {
        hostingCategoryService.delete(idHosting, idCategory);
    }

    @Get('/todos')
    async findAll(): Promise<HostingCategory[]> {
        return hostingCategoryService.findAll();
    }

    @Post()
    async create(@Body() hostingCategory: HostingCategory): Promise<void> {
        hostingCategoryService.create(hostingCategory);
    }

}

export default new HostingCategoryController();