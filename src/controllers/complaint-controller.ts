import { Body, Get, Post, Route, Tags, Delete, Put, Patch, Path } from "tsoa";
import  { Complaint } from "../models/models";
import { complaintService } from "../services/services";

@Tags("Denuncias")
@Route("denuncia")
class ComplaintController {
    @Get('/cliente/:cpf')
    async findComplaintsByClientCPF(cpf: string): Promise<Complaint[]> {
        return complaintService.findComplaintsByClientCPF(cpf);
    }
    @Put("/id/:id")
    async update(@Path() id: number, @Body() complaint: Complaint): Promise<void> {
        complaintService.update(id, complaint);
    }

    @Patch("/id/:id")
    async updateAllFields(@Path() id: number, @Body() complaint: Complaint): Promise<void> {
        complaintService.updateAllFields(id, complaint);
    }

    @Get('/id/:id')
    async findById(@Path() id: number): Promise<Complaint> {
        return complaintService.findById(id);
    }

    @Delete('/id/:id')
    async delete(@Path() id: number): Promise<void> {
        complaintService.delete(id);
    }


    @Get('/todos')
    async findAll(): Promise<Complaint[]> {
        return complaintService.findAll();
    }

    @Post()
    async create(@Body() complaint: Complaint): Promise<void> {
        complaintService.create(complaint);
    }

}

export default new ComplaintController();