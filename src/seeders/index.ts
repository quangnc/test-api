import { seeder } from 'nestjs-seeder';
import { User } from 'src/modules/auth/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_URL, IS_PRODUCTION } from 'src/configs';
import { Category } from 'modules/categories/entities/category.entity';
import { CategoryLocale } from 'modules/categories/entities/category-locale.entity';
import { Article } from 'modules/articles/entities/article.entity';
import { Admin } from 'src/modules/auth/entities/admin.entity';
import { AdminsSeeder } from './admins.seeder';

seeder({
  imports: [
    // Database
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: DATABASE_URL,
      synchronize: true,
      autoLoadEntities: true,
      ssl: IS_PRODUCTION ? { rejectUnauthorized: false } : false,
    }),
    TypeOrmModule.forFeature([User, Category, CategoryLocale, Article, Admin]),
  ],
  // }).run([CategoriesSeeder, UsersSeeder ]);
}).run([AdminsSeeder]);
