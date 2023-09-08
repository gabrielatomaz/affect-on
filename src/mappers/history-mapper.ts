import { HistoryEntity } from "../entities/entities";
import { History } from "../models/models";

class HistoryMapper {
    map(historyEntity: HistoryEntity): History {
        if (!historyEntity) return {};

        const { id, data_hora_modificacao, id_reserva, status}: HistoryEntity = historyEntity
        const history: History = {
            id,
            dateTimeUpdate: data_hora_modificacao,
            idBooking: id_reserva,
            status: status,
        };

        return history;
    }
}

export default new HistoryMapper();