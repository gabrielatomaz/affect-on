import { RatingEntity } from "../entities/entities";
import { Rating } from "../models/models";

class RatingMapper {
    map(ratingEntity: RatingEntity): Rating {
        if (!ratingEntity) return {};

        const { id, id_local_hospedagem, cpf, nota, comentario }: RatingEntity = ratingEntity
        const rating: Rating = {
            id,
            idAccommodation: id_local_hospedagem,
            score: nota,
            cpf,
            comment: comentario,
        };

        return rating;
    }
}

export default new RatingMapper();