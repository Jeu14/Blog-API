import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDTO, CreateAuthorSchema } from './create-author.dto';

@Controller('authors')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) {};

    @Post()
    @HttpCode(201)
    async create(@Body() author: CreateAuthorDTO) {

        const { error } = CreateAuthorSchema.validate(author);
        if (error) {
        throw new BadRequestException(`Validation failed: ${error.message}`);
        }

        const emailExists = await this.authorService.findAuthorByEmail(author.email);

        if (emailExists) {
            throw new BadRequestException('Email already exists');
        }

        const cpfExists = await this.authorService.findAuthorCPF(author.cpf);

        if (cpfExists) {
            throw new BadRequestException('This CPF is not available');
        }

        const newAuthor = await this.authorService.create(author);

        return newAuthor;
    }

    @Get()
    async list() {
        const authors = await this.authorService.findManyAuthors();
        return authors;
    };

    @Get(':id') 
    async show(@Param('id') id: string) {
        const author = await this.authorService.findAuthorById(Number(id));

        if (!author) {
            throw new NotFoundException('Author not found');
        }

        return author;
    }

    @Put(':id')
    @HttpCode(204)
    async update(@Param('id') id: string, @Body() author: CreateAuthorDTO) {

        const { error } = CreateAuthorSchema.validate(author);
        if (error) {
        throw new BadRequestException(`Validation failed: ${error.message}`);
        }

        const foundAuthor = await this.authorService.findAuthorById(Number(id));

        if (!foundAuthor) {
            throw new NotFoundException('Author not found');
        }

        const emailExists = await this.authorService.findAuthorByEmail(author.email);

        if (emailExists && emailExists.email !== foundAuthor.email) {
            throw new BadRequestException('Email already exists');
        }

        const cpfExists = await this.authorService.findAuthorCPF(author.cpf);

        if (cpfExists && cpfExists.cpf !== foundAuthor.cpf) {
            throw new BadRequestException('This CPF is not available');
        }

        return await this.authorService.update(Number(foundAuthor.id), author);         
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string) {
        const author = await this.authorService.findAuthorById(Number(id));
        
        if (!author) {
            throw new NotFoundException('Author not found');
        }

       return await this.authorService.delete(Number(author.id));
    }
}
