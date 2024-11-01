import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreatePostDTO } from './create-post.dto';

@Injectable()
export class PostService {
    constructor(private readonly prisma: PrismaService) {}

    async createPost(post: CreatePostDTO) {

        if (!post.authorId) {
            throw new Error('Author ID is required to create a post');
        }

        const categories = await Promise.all(
            post.categories.map(async (categoryId) => {
                const category = await this.prisma.category.findUnique({ where: { id: categoryId } });

                if (!category) {
                    throw new NotFoundException(`Category with ID ${categoryId} not found`);
                }

                return category;
            })
        );
    
    
        const newPost = await this.prisma.post.create({
            data: {
                title: post.title,
                content: post.content,
                authorId: post.authorId,
                postCategory: {
                    create: categories.map((category) => ({
                        categoryId: category.id
                    })),
                },
            },
        });

        return newPost
    }

    async listPosts() {
        const posts = await this.prisma.post.findMany({
            include: {
                author: true,
                    postCategory: {
                        include: {
                            category: true
                        }
                    }
            }
        })

        const result = posts.map(post => {
            return {
                ...post,
                postCategory: undefined,
                categories: post.postCategory.map(category => {
                    return {
                        id: category.categoryId,
                        name: category.category.name
                    }
                })
            }
        })

        return result
    }

    async findPostById(id: string) {
        const post = await this.prisma.post.findUnique({
            where: {
                id
            }
        })

        return post
    }

    async deletePost(authorId: number, postId: string) {
        const post = await this.prisma.post.findUnique({
            where: {
                id: postId
            }
        })
        
        if (!post) {
            throw new NotFoundException('Post not found')
        }

        if (post.authorId !== authorId) {
            throw new NotFoundException('Author does not own this post');
        }

        await this.prisma.postCategory.deleteMany({
            where: { postId: postId },
        });

        await this.prisma.post.delete({
            where: {
                id: postId
            }
        })
    }
}
