import { HostingComfortEntity } from "../entities/entities";
import { HostingComfort } from "../models/models";

class HostingComfortMapper {
    map(hostingComfortEntity: HostingComfortEntity): HostingComfort {
        if (!hostingComfortEntity) return {};

        const { id_comodidade, id_local_hospedagem }: HostingComfortEntity = hostingComfortEntity
        const hostingComfort: HostingComfort = {
            idComfort: id_comodidade,
            idHosting: id_local_hospedagem,
        };

        return hostingComfort;
    }
}

export default new HostingComfortMapper();