import { ComfortEntity } from "../entities/entities";
import { Comfort } from "../models/models";

class ComfortMapper {
    map(comfortEntity: ComfortEntity): Comfort {
        if (!comfortEntity) return {};

        const { id, nome, id_preferencia }: ComfortEntity = comfortEntity
        const comfort: Comfort = {
            id,
            idPreference: id_preferencia,
            name: nome,
        };

        return comfort;
    }
}

export default new ComfortMapper();