import { Body, Get, Post, Route, Tags, Delete, Put, Patch, Path } from "tsoa";
import  { Category } from "../models/models";
import { categoryService } from "../services/services";

@Tags("Categorias")
@Route("categoria")
class CategoryController {
    @Put("/id/:id")
    async update(@Path() id: number, @Body() category: Category): Promise<void> {
        categoryService.update(id, category);
    }

    @Patch("/id/:id")
    async updateAllFields(@Path() id: number, @Body() category: Category): Promise<void> {
        categoryService.updateAllFields(id, category);
    }

    @Get('/id/:id')
    async findById(@Path() id: number): Promise<Category> {
        return categoryService.findById(id);
    }

    @Delete('/id/:id')
    async delete(@Path() id: number): Promise<void> {
        categoryService.delete(id);
    }


    @Get('/todos')
    async findAll(): Promise<Category[]> {
        return categoryService.findAll();
    }

    @Post()
    async create(@Body() category: Category): Promise<void> {
        categoryService.create(category);
    }

}

export default new CategoryController();