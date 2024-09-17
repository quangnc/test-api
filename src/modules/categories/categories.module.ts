import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoryLocale } from './entities/category-locale.entity';

@Module({
  controllers: [],
  providers: [CategoriesService],
  imports: [TypeOrmModule.forFeature([Category, CategoryLocale])],
  exports: [CategoriesService],
})
export class CategoriesModule {}
