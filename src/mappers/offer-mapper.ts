import { OfferEntity } from "../entities/entities";
import { Offer } from "../models/models";

class OfferMapper {
    map(offerEntity: OfferEntity): Offer {
        if (!offerEntity) return {};

        const {
            id,
            area,
            descricao,
            id_local_hospedagem,
            n_adultos,
            n_camas,
            n_criancas,
            n_quartos,
            valor,
        }: OfferEntity = offerEntity
        const offer: Offer = {
            id,
            area,
            description: descricao,
            idAccomodation: id_local_hospedagem,
            numberOfAdults: n_adultos,
            numberOfBeds: n_camas,
            numberOfKids: n_criancas,
            numberOfRooms: n_quartos,
            value: valor,
        };

        return offer;
    }
}

export default new OfferMapper();