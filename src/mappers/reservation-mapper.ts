import { ReservationEntity } from "../entities/entities";
import { Reservation } from "../models/models";

class ReservationMapper {
    map(reservationEntity: ReservationEntity): Reservation {
        if (!reservationEntity) return {};

        const { id, cpf, data_fim, data_inicio, id_oferta }: ReservationEntity = reservationEntity
        const reservation: Reservation = {
            id,
            cpf,
            beginDate: data_inicio,
            endDate: data_fim,
            idOffer: id_oferta,
        };

        return reservation;
    }
}

export default new ReservationMapper();