import { seeder } from 'nestjs-seeder';
import { User } from 'src/modules/auth/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_URL, IS_PRODUCTION } from 'src/configs';
import { Category } from 'modules/categories/entities/category.entity';
import { CategoryLocale } from 'modules/categories/entities/category-locale.entity';
import { Apk } from 'modules/apks/entities/apk.entity';
import { ApkInfo } from 'modules/apks/entities/apk-info.entity';
import { ApkVersion } from 'modules/apks/entities/apk-version.entity';
import { ApkVariant } from 'modules/apks/entities/apk-variant.entity';
import { Publisher } from 'modules/apks/entities/publisher.entity';
import { ApkScreenshot } from 'modules/apks/entities/apk-screenshot.entity';
import { ApkVersionInfo } from 'modules/apks/entities/apk-version-dev.entity';
import { Article } from 'modules/articles/entities/article.entity';
import { Tag } from 'modules/tags/entities/tag.entity';
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
    TypeOrmModule.forFeature([
      User,
      Category,
      CategoryLocale,
      Apk,
      ApkInfo,
      ApkVersion,
      ApkVariant,
      ApkVersionInfo,
      ApkScreenshot,
      Publisher,
      Article,
      Tag,
      Admin,
    ]),
  ],
  // }).run([CategoriesSeeder, ApksSeeder, UsersSeeder ]);
}).run([AdminsSeeder]);
