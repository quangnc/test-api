import { Module } from '@nestjs/common';
import { ServiceService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { ServiceCategory } from './entities/service-type.entity';
import { ServiceCategoryService } from './service-category.service';
import { ServiceCategoryController } from './service-category.controller';
import { ServiceLocales } from './entities/service-locales.entity';

@Module({
  controllers: [ServicesController, ServiceCategoryController],
  providers: [ServiceService, ServiceCategoryService],
  imports: [
    TypeOrmModule.forFeature([Service, ServiceCategory, ServiceLocales]),
  ],
  exports: [ServiceService, ServiceCategoryService],
})
export class ServicesModule {}
