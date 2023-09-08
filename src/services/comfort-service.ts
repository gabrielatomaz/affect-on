import { Comfort } from "../models/models";
import { comfortRepository } from "../repositories/repositories";
import { comfortMapper } from "../mappers/mappers"

class ComfortService {
    async updateAllFields(id: number, comfort: Comfort): Promise<void> {
        comfortRepository.update(id, comfort);
    }

    async findAll(): Promise<Comfort[]> {
        const { rows: comforts } = await comfortRepository.findAll();
        return comforts.map(preferece => comfortMapper.map(preferece));
    }

    async delete(id: number): Promise<void> {
        comfortRepository.delete(id);
    }

    async findById(id: number): Promise<Comfort> {
        const { rows: [comfortFound] } = await comfortRepository.findById(id);

        return comfortMapper.map(comfortFound);
    }

    async update(id: number, comfort: Comfort): Promise<void> {
        const { idPreference, name } = comfort;
        const {
            idPreference: idPreferenceFound,
            name: nameFound,
        }: Comfort = await this.findById(id);
        const comfortToBeUpdated: Comfort = {
            idPreference: idPreference ? idPreference : idPreferenceFound,
            name: name ? name : nameFound,
        };
        comfortRepository.update(id, comfortToBeUpdated);
    }

    async create(comfort: Comfort): Promise<void> {
        comfortRepository.create(comfort);
    }

}

export default new ComfortService();