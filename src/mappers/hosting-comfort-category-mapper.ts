import { HostingComfortCategoryEntity } from "../entities/entities";
import { HostingComfortCategory } from "../models/models";

class HostingComfortCategoryMapper {
    map(hostingComfortCategoryEntity: HostingComfortCategoryEntity): HostingComfortCategory {
        if (!hostingComfortCategoryEntity) return {};

        const { 
            id,
            cnpj,
            descricao,
            endereço,
            nome,
            nome_categoria,
            nome_comodidade,
            palavra_chave_categoria,
            tipo_hospedagem,
         }: HostingComfortCategoryEntity = hostingComfortCategoryEntity
        const hostingComfortCategory: HostingComfortCategory = {
            id,
            cnpj,
            description: descricao,
            address: endereço,
            name: nome,
            categoryName: nome_categoria,
            comfortName: nome_comodidade,
            categoryKeyWord: palavra_chave_categoria,
            hostType: tipo_hospedagem,
        };

        return hostingComfortCategory;
    }
}

export default new HostingComfortCategoryMapper();