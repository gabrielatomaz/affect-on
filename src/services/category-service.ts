import { Category } from "../models/models";
import { CategoryRepository } from "../repositories/repositories";
import { CategoryMapper } from "../mappers/mappers"

class CategoryService {
    async updateAllFields(id: number, category: Category): Promise<void> {
        CategoryRepository.update(id, category);
    }

    async findAll(): Promise<Category[]> {
        const { rows: categorys } = await CategoryRepository.findAll();
        return categorys.map(preferece => CategoryMapper.map(preferece));
    }

    async delete(id: number): Promise<void> {
        CategoryRepository.delete(id);
    }

    async findById(id: number): Promise<Category> {
        const { rows: [categoryFound] } = await CategoryRepository.findById(id);

        return CategoryMapper.map(categoryFound);
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
        CategoryRepository.update(id, categoryToBeUpdated);
    }

    async create(category: Category): Promise<void> {
        CategoryRepository.create(category);
    }

}

export default new CategoryService();