import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post } from '@nestjs/common';
import { CreatePostDTO } from './create-post.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    @HttpCode(201)
    async create(@Body() postDTO: CreatePostDTO) {
        const foundAuthor = await this.postService.createPost(postDTO);        

        return foundAuthor
    }

    @Get()
    @HttpCode(200)
    async list() {
        const posts = await this.postService.listPosts();

        return posts
    }

    @Delete(':id')
    @HttpCode(200)
    async delete(@Param('id') authorId: number, @Body('postId') postId: string) {

        return await this.postService.deletePost(Number(authorId), postId)
    }
}
