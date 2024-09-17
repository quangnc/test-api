import { Module } from '@nestjs/common';
import { ApksService } from './services/apks.service';
import { ApksController } from './controllers/apks.controller';
import { PublishersService } from './services/publishers.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApksFeature } from './constants';
import { SearchController } from './controllers/search.controller';
import { SearchService } from 'modules/apks/services/search.service';
import { ArticlesModule } from 'modules/articles/articles.module';
import { StatsService } from 'modules/apks/services/stats.service';
import { PublisherController } from 'modules/apks/controllers/publisher.controller';
import { CollectionController } from 'modules/apks/controllers/collection.controller';
import { ListTopService } from 'modules/apks/services/list-top.service';

@Module({
  controllers: [ApksController, SearchController, PublisherController, CollectionController],
  providers: [ApksService, PublishersService, SearchService, StatsService, ListTopService],
  imports: [TypeOrmModule.forFeature(ApksFeature), ArticlesModule],
  exports: [ApksService, ListTopService],
})
export class ApksModule {}
