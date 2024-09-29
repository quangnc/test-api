import { Module } from '@nestjs/common';
import { AuthModule } from 'modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthenticatedGuard } from 'src/common/guards/authenicated.guard';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from 'modules/categories/categories.module';
import { CommonModule } from 'modules/common/common.module';
import filters from 'src/common/filters';
import { ArticlesModule } from 'modules/articles/articles.module';
import { SlidersModule } from 'modules/sliders/sliders.module';
import { TypeOrmConfig } from './configs/typeorm.config';
import { DocumentsModule } from './modules/documents/documents.module';
import { CertificatesModule } from './modules/certificates/certificates.module';
import { ServicesModule } from './modules/services/services.module';
import { NewsModule } from './modules/news/news.module';

@Module({
  imports: [
    // configs
    ConfigModule.forRoot({ isGlobal: true }),
    // Database
    TypeOrmModule.forRoot(TypeOrmConfig),
    ScheduleModule.forRoot(),
    CommonModule,
    AuthModule,
    CategoriesModule,
    ArticlesModule,
    SlidersModule,
    DocumentsModule,
    CertificatesModule,
    ServicesModule,
    NewsModule,
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
