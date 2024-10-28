import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';

@Module({
    imports: [DatabaseModule],
    providers: [AuthorService],
    controllers: [AuthorController]
})
export class AuthorModule {}
