import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { DatabaseModule } from 'src/database/database.module';
import { PostController } from './post.controller';
import { AuthorService } from 'src/author/author.service';
import { CategoryService } from 'src/category/category.service';

@Module({
  imports: [DatabaseModule],
  providers: [PostService, AuthorService, CategoryService],
  controllers: [PostController]
})
export class PostModule {}
