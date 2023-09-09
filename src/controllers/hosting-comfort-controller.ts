import { Body, Get, Post, Route, Tags, Delete, Put, Patch, Path } from "tsoa";
import  { HostingComfort } from "../models/models";
import { hostingComfortService } from "../services/services";

@Tags("Locais de Hospedagem - Comodidades")
@Route("local-de-hospedagem-comodidade")
class HostingComfortController {
    @Get('/id-local-de-hospedagem/:idLocalDeHospedagem/comodidade/:idComodidade')
    async findByIds(@Path('idLocalDeHospedagem') idHosting: number, @Path('idComodidade') idComfort: number): Promise<HostingComfort> {
        return hostingComfortService.findByIds(idHosting, idComfort);
    }

    @Delete('/id-grupo/:idLocalDeHospedagem/comodidade/:idComodidade')
    async delete(@Path('idLocalDeHospedagem') idHosting: number, @Path('idComodidade') idComfort: number): Promise<void> {
        hostingComfortService.delete(idHosting, idComfort);
    }

    @Get('/todos')
    async findAll(): Promise<HostingComfort[]> {
        return hostingComfortService.findAll();
    }

    @Post()
    async create(@Body() hostingComfort: HostingComfort): Promise<void> {
        hostingComfortService.create(hostingComfort);
    }

}

export default new HostingComfortController();