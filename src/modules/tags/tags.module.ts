import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { Tag } from 'modules/tags/entities/tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apk } from 'modules/apks/entities/apk.entity';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [TypeOrmModule.forFeature([Tag, Apk])],
})
export class TagsModule {}
