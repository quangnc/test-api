import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'modules/articles/entities/article.entity';
import { User } from 'modules/auth/entities/user.entity';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  imports: [TypeOrmModule.forFeature([Article, User])],
  exports: [ArticlesService],
})
export class ArticlesModule {}
