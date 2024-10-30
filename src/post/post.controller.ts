import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
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
        const posts = await this.postService.findPost();

        return posts
    }
}