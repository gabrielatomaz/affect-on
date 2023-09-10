import { Body, Get, Post, Route, Tags, Delete, Put, Patch, Path } from "tsoa";
import  { Offer } from "../models/models";
import { offerService } from "../services/services";

@Tags("Ofertas")
@Route("oferta")
class OfferController {
    @Put("/id/:id")
    async update(@Path() id: number, @Body() offer: Offer): Promise<void> {
        offerService.update(id, offer);
    }

    @Patch("/id/:id")
    async updateAllFields(@Path() id: number, @Body() offer: Offer): Promise<void> {
        offerService.updateAllFields(id, offer);
    }

    @Get('/id/:id')
    async findById(@Path() id: number): Promise<Offer> {
        return offerService.findById(id);
    }

    @Delete('/id/:id')
    async delete(@Path() id: number): Promise<void> {
        offerService.delete(id);
    }


    @Get('/todos')
    async findAll(): Promise<Offer[]> {
        return offerService.findAll();
    }

    @Post()
    async create(@Body() offer: Offer): Promise<void> {
        offerService.create(offer);
    }

}

export default new OfferController();