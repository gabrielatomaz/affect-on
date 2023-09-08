import { HostEntity } from "../entities/entities";
import { Host } from "../models/models";

class HostMapper {
    map(hostEntity: HostEntity): Host {
        if (!hostEntity) return {};

        const { email, cnpj, nome_fantasia }: HostEntity = hostEntity
        const host: Host = {
            email,
            cnpj,
            fantasyName: nome_fantasia,
        };

        return host;
    }
}

export default new HostMapper();