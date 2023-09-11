import { Rating } from "../models/models";
import { ratingRepository } from "../repositories/repositories";
import { ratingMapper } from "../mappers/mappers"

class RatingService {
    async updateAllFields(id: number, rating: Rating): Promise<void> {
        ratingRepository.update(id, rating);
    }

    async findAll(): Promise<Rating[]> {
        const { rows: ratings } = await ratingRepository.findAll();
        return ratings.map(rating => ratingMapper.map(rating));
    }

    async delete(id: number): Promise<void> {
        ratingRepository.delete(id);
    }

    async findById(id: number): Promise<Rating> {
        const { rows: [ratingFound] } = await ratingRepository.findById(id);

        return ratingMapper.map(ratingFound);
    }

    async update(id: number, rating: Rating): Promise<void> {
        const { cpf, score, idAccommodation, comment } = rating;
        const {
            cpf: cpfFound,
            score: scoreFound,
            idAccommodation: idAccommodationFound,
            comment: commentFound,
        }: Rating = await this.findById(id);
        const ratingToBeUpdated: Rating = {
            cpf: cpf ? cpf : cpfFound,
            score: score ? score : scoreFound,
            idAccommodation: idAccommodation ? idAccommodation : idAccommodationFound,
            comment: comment ? comment : commentFound,
        };

        ratingRepository.update(id, ratingToBeUpdated);
    }

    async create(rating: Rating): Promise<void> {
        ratingRepository.create(rating);
    }

}

export default new RatingService();