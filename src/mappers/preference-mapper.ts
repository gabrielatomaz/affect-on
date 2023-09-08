import { PreferenceEntity } from "../entities/entities";
import { Preference } from "../models/models";

class PreferenceMapper {
    map(preferenceEntity: PreferenceEntity): Preference {
        if (!preferenceEntity) return {};

        const { resposta, id, cpf }: PreferenceEntity = preferenceEntity
        const preference: Preference = {
            id,
            cpf,
            response: resposta,
        };

        return preference;
    }
}

export default new PreferenceMapper();