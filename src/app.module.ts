import { Module } from '@nestjs/common';
import { AuthorModule } from './author/author.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [AuthorModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
