import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './create-category.dto';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    @HttpCode(201)
    async create(@Body() CreateCategoryDTO: CreateCategoryDTO) {
        const category = await this.categoryService.createCategory(CreateCategoryDTO.names)

        return category
    }
}
 