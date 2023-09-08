import { Preference } from "../models/models";
import { PreferenceRepository } from "../repositories/repositories";
import { PreferenceMapper } from "../mappers/mappers"

class PreferenceService {
        async updateAllFields(id: number, preference: Preference): Promise<void> {
            PreferenceRepository.update(id, preference);
        }

        async findAll(): Promise<Preference[]> {
            const { rows: preferences } = await PreferenceRepository.findAll();
            return preferences.map(preferece => PreferenceMapper.map(preferece));
        }

        async delete(id: number): Promise<void> {
            PreferenceRepository.delete(id);
        }

        async findById(id: number): Promise<Preference> {
            const { rows: [preferenceFound] } = await PreferenceRepository.findById(id);

            return PreferenceMapper.map(preferenceFound);
        }

        async update(id: number, preference: Preference): Promise<void> {
            const { cpf, response } = preference;
            const { cpf: cpfFound, response: responseFound }: Preference = await this.findById(id);
            const preferenceToBeUpdated: Preference = {
                cpf: cpf ? cpf : cpfFound,
                response: response ? response : responseFound,
            };
            PreferenceRepository.update(id, preferenceToBeUpdated);
        }

        async create(preference: Preference): Promise<void> {
            PreferenceRepository.create(preference);
        }

    }

export default new PreferenceService();