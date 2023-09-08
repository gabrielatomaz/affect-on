import { Rating } from "../models/models";
import { RatingRepository } from "../repositories/repositories";
import { RatingMapper } from "../mappers/mappers"

class RatingService {
    async updateAllFields(id: number, rating: Rating): Promise<void> {
        RatingRepository.update(id, rating);
    }

    async findAll(): Promise<Rating[]> {
        const { rows: ratings } = await RatingRepository.findAll();
        return ratings.map(preferece => RatingMapper.map(preferece));
    }

    async delete(id: number): Promise<void> {
        RatingRepository.delete(id);
    }

    async findById(id: number): Promise<Rating> {
        const { rows: [ratingFound] } = await RatingRepository.findById(id);

        return RatingMapper.map(ratingFound);
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

        RatingRepository.update(id, ratingToBeUpdated);
    }

    async create(rating: Rating): Promise<void> {
        RatingRepository.create(rating);
    }

}

export default new RatingService();