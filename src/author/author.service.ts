import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAuthorDTO } from './create-author.dto';

@Injectable()
export class AuthorService {
    constructor(private readonly prisma: PrismaService) {}

    async findAuthorByEmail(email: string) {
        const author = await this.prisma.author.findUnique({
            where: {
                email
            }
        })
        return author
    }

    async findAuthorCPF(cpf: string) {
        const authorCPF = await this.prisma.author.findUnique({
            where: {
                cpf
            }
        })
        return authorCPF
    }

    async findAuthorById(id: number) {
        const author = await this.prisma.author.findUnique({
            where: {
                id
            }
        })
        return author
    }

    async findManyAuthors() {
        const authors = await this.prisma.author.findMany({
            include: {
                profile: true,
                posts: true
            }
        })
        return authors
    }

    async create(author: CreateAuthorDTO) {
        const newAuthor = await this.prisma.author.create({
            data: author
        })
        return newAuthor
    }

    async createProfile(id: number, description: string) {

        const existingProfile = await this.prisma.profile.findUnique({
            where: {
                authorId: id,
            },
        });
    
        if (existingProfile) {
            throw new BadRequestException('Author already has a profile');
        }

        const profile = await this.prisma.profile.create({
            data: {
                description,
                authorId: id
            }
        })

        return profile
    }

    async update(id: number, author: CreateAuthorDTO) {
        await this.prisma.author.update({
            where: {
                id
            },
            data: author
        })
    }

    async delete(id: number) {
        await this.prisma.author.delete({
            where: {
                id
            }
        })
    }

}
