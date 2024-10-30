import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CategoryService {
    constructor(private readonly prisma: PrismaService) {}

    async createCategory(names: string[]) {
        const dataNames = names.map(name => {
            return {
                name
            }
        })

        const category = await this.prisma.category.createManyAndReturn({
            data: dataNames
        })

        return category
    }
}
