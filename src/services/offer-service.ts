import { Offer } from "../models/models";
import { offerRepository } from "../repositories/repositories";
import { offerMapper } from "../mappers/mappers"

class OfferService {
    async updateAllFields(id: number, offer: Offer): Promise<void> {
        offerRepository.update(id, offer);
    }

    async findAll(): Promise<Offer[]> {
        const { rows: offers } = await offerRepository.findAll();
        return offers.map(preferece => offerMapper.map(preferece));
    }

    async delete(id: number): Promise<void> {
        offerRepository.delete(id);
    }

    async findById(id: number): Promise<Offer> {
        const { rows: [offerFound] } = await offerRepository.findById(id);

        return offerMapper.map(offerFound);
    }

    async update(id: number, offer: Offer): Promise<void> {
        const {
            area,
            description,
            idAccomodation,
            numberOfAdults,
            numberOfBeds,
            numberOfKids,
            numberOfRooms,
            value,
        } = offer;
        const {
            area: areaFound,
            description: descriptionFound,
            idAccomodation: idAccommodationFound,
            numberOfAdults: numberOfAdultsFound,
            numberOfBeds: numberOfBedsFound,
            numberOfKids: numberOfKidsFound,
            numberOfRooms: numberOfRoomsFound,
            value: valueFound,
        }: Offer = await this.findById(id);
        const offerToBeUpdated: Offer = {
            area: area ? area : areaFound,
            description: description ? description : descriptionFound,
            idAccomodation: idAccomodation ? idAccomodation : idAccommodationFound,
            numberOfAdults: numberOfAdults ? numberOfAdults : numberOfAdultsFound,
            numberOfBeds: numberOfBeds ? numberOfBeds : numberOfBedsFound,
            numberOfKids: numberOfKids ? numberOfKids : numberOfKidsFound,
            numberOfRooms: numberOfRooms ? numberOfRooms : numberOfRoomsFound,
            value: value ? value : valueFound,
        };

        offerRepository.update(id, offerToBeUpdated);
    }

    async create(offer: Offer): Promise<void> {
        offerRepository.create(offer);
    }

}

export default new OfferService();