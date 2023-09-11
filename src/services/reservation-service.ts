import { Reservation } from "../models/models";
import { reservationRepository } from "../repositories/repositories";
import { reservationMapper } from "../mappers/mappers"

class ReservationService {

    async findReservationsByUserEmail(email: string): Promise<Reservation[]> {
        const { rows: reservations } = await reservationRepository
            .findReservationsByUserEmail(email);
        return reservations
            .map(reservation => reservationMapper.map(reservation));
    }

    async updateAllFields(id: number, reservation: Reservation): Promise<void> {
        reservationRepository.update(id, reservation);
    }

    async findAll(): Promise<Reservation[]> {
        const { rows: reservations } = await reservationRepository.findAll();
        return reservations.map(reservation => reservationMapper.map(reservation));
    }

    async delete(id: number): Promise<void> {
        reservationRepository.delete(id);
    }

    async findById(id: number): Promise<Reservation> {
        const { rows: [reservationFound] } = await reservationRepository.findById(id);

        return reservationMapper.map(reservationFound);
    }

    async update(id: number, reservation: Reservation): Promise<void> {
        const { cpf, idOffer, beginDate, endDate } = reservation;
        const {
            cpf: cpfFound,
            idOffer: idOfferFound,
            beginDate: beginDateFound,
            endDate: endDateFound,
        }: Reservation = await this.findById(id);
        const reservationToBeUpdated: Reservation = {
            cpf: cpf ? cpf : cpfFound,
            idOffer: idOffer ? idOffer : idOfferFound,
            beginDate: beginDate ? beginDate : beginDateFound,
            endDate: endDate ? endDate : endDateFound,
        };

        reservationRepository.update(id, reservationToBeUpdated);
    }

    async create(reservation: Reservation): Promise<void> {
        reservationRepository.create(reservation);
    }

}

export default new ReservationService();