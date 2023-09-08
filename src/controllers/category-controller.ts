import { Body, Get, Post, Route, Tags, Delete, Put, Patch, Path } from "tsoa";
import  { Category } from "../models/models";
import { CategoryService } from "../services/services";

@Tags("Categorias")
@Route("categoria")
class CategoryController {
    @Put("/id/:id")
    async update(@Path() id: number, @Body() category: Category): Promise<void> {
        CategoryService.update(id, category);
    }

    @Patch("/id/:id")
    async updateAllFields(@Path() id: number, @Body() category: Category): Promise<void> {
        CategoryService.updateAllFields(id, category);
    }

    @Get('/id/:id')
    async findById(@Path() id: number): Promise<Category> {
        return CategoryService.findById(id);
    }

    @Delete('/id/:id')
    async delete(@Path() id: number): Promise<void> {
        CategoryService.delete(id);
    }


    @Get('/todos')
    async findAll(): Promise<Category[]> {
        return CategoryService.findAll();
    }

    @Post()
    async create(@Body() category: Category): Promise<void> {
        CategoryService.create(category);
    }

}

export default new CategoryController();