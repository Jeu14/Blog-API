import { Module } from '@nestjs/common';
import { AuthorModule } from './author/author.module';
import { CategoryModule } from './category/category.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [AuthorModule, CategoryModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
