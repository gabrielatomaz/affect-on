import { History } from "../models/models";
import { historyRepository } from "../repositories/repositories";
import { historyMapper } from "../mappers/mappers"

class HistoryService {
    async updateAllFields(id: number, history: History): Promise<void> {
        historyRepository.update(id, history);
    }

    async findAll(): Promise<History[]> {
        const { rows: historys } = await historyRepository.findAll();
        return historys.map(preferece => historyMapper.map(preferece));
    }

    async delete(id: number): Promise<void> {
        historyRepository.delete(id);
    }

    async findById(id: number): Promise<History> {
        const { rows: [historyFound] } = await historyRepository.findById(id);

        return historyMapper.map(historyFound);
    }

    async update(id: number, history: History): Promise<void> {
        const { dateTimeUpdate, idBooking, status } = history;
        const {
            dateTimeUpdate: dateTimeUpdateFound,
            idBooking: idBookingFound,
            status: statusFound,
        }: History = await this.findById(id);
        const historyToBeUpdated: History = {
            dateTimeUpdate: dateTimeUpdate ? dateTimeUpdate : dateTimeUpdateFound,
            idBooking: idBooking ? idBooking : idBookingFound,
            status: status ? status : statusFound,
        };
        historyRepository.update(id, historyToBeUpdated);
    }

    async create(history: History): Promise<void> {
        historyRepository.create(history);
    }

}

export default new HistoryService();