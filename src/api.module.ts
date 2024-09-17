import { Module } from '@nestjs/common';
import { AuthModule } from 'modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthenticatedGuard } from 'src/common/guards/authenicated.guard';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApksModule } from 'modules/apks/apks.module';
import { CategoriesModule } from 'modules/categories/categories.module';
import { CommonModule } from 'modules/common/common.module';
import filters from 'src/common/filters';
import { ArticlesModule } from 'modules/articles/articles.module';
import { TagsModule } from 'modules/tags/tags.module';
import { SlidersModule } from 'modules/sliders/sliders.module';
import { TypeOrmConfig } from './configs/typeorm.config';

@Module({
  imports: [
    // configs
    ConfigModule.forRoot({ isGlobal: true }),
    // Database
    TypeOrmModule.forRoot(TypeOrmConfig),
    ScheduleModule.forRoot(),
    CommonModule,
    AuthModule,
    ApksModule,
    CategoriesModule,
    ArticlesModule,
    TagsModule,
    SlidersModule,
  ],
  // filters
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticatedGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    ...filters,
  ],
})
export class ApiModule {}
