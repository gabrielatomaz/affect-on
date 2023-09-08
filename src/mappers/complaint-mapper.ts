import { ComplaintEntity } from "../entities/entities";
import { Complaint } from "../models/models";

class ComplaintMapper {
    map(complaintEntity: ComplaintEntity): Complaint {
        if (!complaintEntity) return {};

        const { id, cpf, descricao, id_local_hospedagem, status }: ComplaintEntity = complaintEntity
        const complaint: Complaint = {
            id,
            cpf,
            description: descricao,
            idAccomodation: id_local_hospedagem,
            status,
        };

        return complaint;
    }
}

export default new ComplaintMapper();