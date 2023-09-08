import { HostingEntity } from "../entities/entities";
import { Hosting } from "../models/models";

class HostingMapper {
    map(hostingEntity: HostingEntity): Hosting {
        if (!hostingEntity) return {};

        const { id, cnpj, descricao, endereço, nome, tipo_hospedagem }: HostingEntity = hostingEntity
        const hosting: Hosting = {
            id,
            cnpj,
            description: descricao,
            address: endereço,
            name: nome,
            hostType: tipo_hospedagem,
        };

        return hosting;
    }
}

export default new HostingMapper();