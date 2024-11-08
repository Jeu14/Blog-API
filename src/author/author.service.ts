import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAuthorDTO } from './authorDTOs/create-author.dto';

@Injectable()
export class AuthorService {
  constructor(private readonly prisma: PrismaService) {}

  async findAuthorByEmail(email: string) {
    const author = await this.prisma.author.findUnique({
      where: {
        email,
      },
    });
    return author;
  }

  async findAuthorCPF(cpf: string) {
    const authorCPF = await this.prisma.author.findUnique({
      where: {
        cpf,
      },
    });
    return authorCPF;
  }

  async findAuthorById(id: number) {
    const author = await this.prisma.author.findUnique({
      where: {
        id,
      },
    });
    return author;
  }

  async findManyAuthors() {
    const authors = await this.prisma.author.findMany({
      include: {
        profile: true,
        posts: true,
      },
    });
    return authors;
  }

  async create(author: CreateAuthorDTO) {
    const { description, ...authorData } = author;

    const newAuthor = await this.prisma.author.create({
      data: {
        ...authorData,
        profile: description
          ? {
              create: { description },
            }
          : undefined,
      },
    });
    return newAuthor;
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
        authorId: id,
      },
    });

    return profile;
  }

  async deleteAuthorProfile(authorId: number) {
    const profile = await this.prisma.profile.findUnique({
      where: {
        authorId,
      },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    await this.prisma.profile.delete({
      where: {
        authorId,
      },
    });
  }

  async update(id: number, author: CreateAuthorDTO) {
    const { description, ...authorData } = author;

    const updatedAuthor = await this.prisma.author.update({
      where: {
        id,
      },
      data: {
        ...authorData
      },
    });

    if (description) {
        await this.prisma.profile.upsert({
        where: { authorId: id },
        update: { description },
        create: { description, authorId: id },
      });
    }
  
    return updatedAuthor;
  }

  async delete(id: number) {
    const hasPosts = await this.prisma.post.findFirst({
      where: { authorId: id },
    });

    if (hasPosts) {
      throw new BadRequestException(
        'Cannot delete author with existing posts.',
      );
    }

    const hasProfile = await this.prisma.profile.findFirst({
      where: { authorId: id },
    });

    if (hasProfile) {
      throw new BadRequestException(
        'Cannot delete author with an existing profile.',
      );
    }

    await this.prisma.author.delete({
      where: {
        id,
      },
    });
  }
}
