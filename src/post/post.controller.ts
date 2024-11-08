import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CreatePostDTO, CreatePostSchema } from './create-post.dto';
import { PostService } from './post.service';
import { DeletePostDTO, DeletePostSchema,  } from './delete-post.dto';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    @HttpCode(201)
    async create(@Body() postDTO: CreatePostDTO) {

        const { error } = CreatePostSchema.validate(postDTO);
        if (error) {
        throw new BadRequestException(`Validation failed: ${error.message}`);
        }

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
    async delete(@Param('id') authorId: number, @Body() DeletePostDTO: DeletePostDTO) {

        const { error } = DeletePostSchema.validate(DeletePostDTO);
        if (error) {
        throw new BadRequestException(`Validation failed: ${error.message}`);
        }

        return await this.postService.deletePost(Number(authorId), String(DeletePostDTO.postId))
    }
}
