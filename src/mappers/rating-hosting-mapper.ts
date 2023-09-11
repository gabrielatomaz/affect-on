import { RatingHostingEntity } from "../entities/entities";
import { RatingHosting } from "../models/models";

class RatingHostingMapper {
    map(ratingHostingEntity: RatingHostingEntity): RatingHosting {
        if (!ratingHostingEntity) return {};

        const {
            id,
            cpf,
            id_local_hospedagem,
            nota,
            comentario,
            nome_local_hospedagem,
        }: RatingHostingEntity = ratingHostingEntity
        const ratingHosting: RatingHosting = {
            id,
            cpf,
            idAccommodation: id_local_hospedagem,
            score: nota,
            comment: comentario,
            hostingName: nome_local_hospedagem,
        };

        return ratingHosting;
    }
}

export default new RatingHostingMapper();