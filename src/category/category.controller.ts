import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO, CreateCategorySchema } from './create-category.dto';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    @HttpCode(201)
    async create(@Body() CreateCategoryDTO: CreateCategoryDTO) {

        const { error } = CreateCategorySchema.validate(CreateCategoryDTO);
        if (error) {
        throw new BadRequestException(`Validation failed: ${error.message}`);
        }

        const category = await this.categoryService.createCategory(CreateCategoryDTO.names)

        return category
    }
}
 