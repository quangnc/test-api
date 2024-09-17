import { Module } from '@nestjs/common';
import { CategoriesModule } from '../categories/categories.module';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { SlidersModule } from 'modules/sliders/sliders.module';
import { ApksModule } from 'modules/apks/apks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from 'modules/common/entities/page.entity';
import { Contact } from 'modules/common/entities/contact.entity';

@Module({
  controllers: [CommonController],
  providers: [CommonService],
  imports: [TypeOrmModule.forFeature([Page, Contact]), CategoriesModule, SlidersModule, ApksModule],
})
export class CommonModule {}
