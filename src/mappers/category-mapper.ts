import { CategoryEntity } from "../entities/entities";
import { Category } from "../models/models";

class CategoryMapper {
    map(categoryEntity: CategoryEntity): Category {
        if (!categoryEntity) return {};

        const { id, id_preferencia, palavrachave, nome }: CategoryEntity = categoryEntity
        const category: Category = {
            id,
            idPreference: id_preferencia,
            keyWord: palavrachave,
            name: nome,
        };

        return category;
    }
}

export default new CategoryMapper();