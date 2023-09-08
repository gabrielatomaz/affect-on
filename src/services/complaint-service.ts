import { Complaint } from "../models/models";
import { complaintRepository } from "../repositories/repositories";
import { complaintMapper } from "../mappers/mappers"

class ComplaintService {
    async updateAllFields(id: number, complaint: Complaint): Promise<void> {
        complaintRepository.update(id, complaint);
    }

    async findAll(): Promise<Complaint[]> {
        const { rows: complaints } = await complaintRepository.findAll();
        return complaints.map(preferece => complaintMapper.map(preferece));
    }

    async delete(id: number): Promise<void> {
        complaintRepository.delete(id);
    }

    async findById(id: number): Promise<Complaint> {
        const { rows: [complaintFound] } = await complaintRepository.findById(id);

        return complaintMapper.map(complaintFound);
    }

    async update(id: number, complaint: Complaint): Promise<void> {
        const { cpf, description, idAccomodation, status } = complaint;
        const {
            cpf: cpfFound,
            description: descriptionFound,
            idAccomodation: idAccomodationFound,
            status: statusFound,
        }: Complaint = await this.findById(id);
        const complaintToBeUpdated: Complaint = {
            cpf: cpf ? cpf : cpfFound,
            description: description ? description : descriptionFound,
            idAccomodation: idAccomodation ? idAccomodation : idAccomodationFound,
            status: status ? status : statusFound,
        };
        complaintRepository.update(id, complaintToBeUpdated);
    }

    async create(complaint: Complaint): Promise<void> {
        complaintRepository.create(complaint);
    }

}

export default new ComplaintService();