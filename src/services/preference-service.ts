import Preference from "../models/prefence";
import preferenceRepository from "../repositories/preference-repository";

class PreferenceService {
    async create(preference: Preference): Promise<void> {
        preferenceRepository.create(preference);
    }

}

export default new PreferenceService();