import { PreferenceComfortCategoryEntity } from "../entities/entities";
import { PreferenceComfortCategory } from "../models/models";

class PreferenceComfortCategoryMapper {
    map(preferenceComfortCategoryEntity: PreferenceComfortCategoryEntity): PreferenceComfortCategory {
        if (!preferenceComfortCategoryEntity) return {};

        const {
            nome_categoria,
            nome_comodidade,
            palavra_chave_categoria,
            id,
            cpf,
            resposta,
        }: PreferenceComfortCategoryEntity = preferenceComfortCategoryEntity
        const preferenceComfortCategory: PreferenceComfortCategory = {
            id,
            cpf,
            response: resposta,
            comfortName: nome_comodidade,
            categoryName: nome_categoria,
            categoryKeyWord: palavra_chave_categoria
        };

        return preferenceComfortCategory;
    }
}

export default new PreferenceComfortCategoryMapper();