import { HostingComfort } from "../models/models";
import { hostingComfortRepository } from "../repositories/repositories";
import { hostingComfortMapper } from "../mappers/mappers"

class HostingComfortService {
    async findAll(): Promise<HostingComfort[]> {
        const { rows: hostingComforts } = await hostingComfortRepository.findAll();
        return hostingComforts.map(preferece => hostingComfortMapper.map(preferece));
    }

    async delete(idHosting: number, idComfort: number): Promise<void> {
        const hostingComfort: HostingComfort = { idComfort, idHosting };
        hostingComfortRepository.delete(hostingComfort);
    }

    async findByIds(idHosting: number, idComfort: number): Promise<HostingComfort> {
        const hostingComfort: HostingComfort = { idHosting, idComfort };
        const { rows: [hostingComfortFound] } =
            await hostingComfortRepository.findByIds(hostingComfort);

        return hostingComfortMapper.map(hostingComfortFound);
    }

    async create(hostingComfort: HostingComfort): Promise<void> {
        hostingComfortRepository.create(hostingComfort);
    }

}

export default new HostingComfortService();