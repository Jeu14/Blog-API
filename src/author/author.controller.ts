import { BadRequestException, Body, Controller, Get, HttpCode, NotFoundException, Param, Post } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDTO } from './create-author.dto';

@Controller('authors')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) {}

    @Post()
    @HttpCode(201)
    async create(@Body() author: CreateAuthorDTO) {
        const emailExists = await this.authorService.findAuthorByEmail(author.email)

        if (emailExists) {
            throw new BadRequestException('Email already exists')
        }

        const newAuthor = await this.authorService.create(author)

        return newAuthor
    }

    @Get()
    async list() {
        const authors = await this.authorService.findManyAuthors()
        return authors
    }

    @Get(':id') 
    async show(@Param('id') id: string) {
        const author = await this.authorService.findAuthorById(Number(id))

        if (!author) {
            throw new NotFoundException('Author not found')
        }

        return author
    }
}
