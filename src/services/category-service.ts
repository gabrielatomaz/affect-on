import { Category } from "../models/models";
import { categoryRepository } from "../repositories/repositories";
import { categoryMapper } from "../mappers/mappers"

class CategoryService {
    async updateAllFields(id: number, category: Category): Promise<void> {
        categoryRepository.update(id, category);
    }

    async findAll(): Promise<Category[]> {
        const { rows: categorys } = await categoryRepository.findAll();
        return categorys.map(preferece => categoryMapper.map(preferece));
    }

    async delete(id: number): Promise<void> {
        categoryRepository.delete(id);
    }

    async findById(id: number): Promise<Category> {
        const { rows: [categoryFound] } = await categoryRepository.findById(id);

        return categoryMapper.map(categoryFound);
    }

    async update(id: number, category: Category): Promise<void> {
        const { idPreference, keyWord, name } = category;
        const {
            idPreference: idPreferenceFound,
            keyWord: keyWordFound,
            name: nameFound,
        }: Category = await this.findById(id);
        const categoryToBeUpdated: Category = {
            idPreference: idPreference ? idPreference : idPreferenceFound,
            keyWord: keyWord ? keyWord : keyWordFound,
            name: name ? name : nameFound,
        };
        categoryRepository.update(id, categoryToBeUpdated);
    }

    async create(category: Category): Promise<void> {
        categoryRepository.create(category);
    }

}

export default new CategoryService();