import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApksService } from '../services/apks.service';
import { UserLanguage } from 'src/common/decorators/user-language.decorator';
import { ApiResponse } from 'src/common/api.response';
import { IsPublic } from 'src/common/decorators';
import { ApkMapper } from 'src/mappers/apk.mapper';
import { PaginationQuery } from 'src/common/requests/queries';
import { PublisherMapper } from 'src/mappers/publisher.mapper';

@Controller({
  path: 'publishers',
  version: '1',
})
@IsPublic()
export class PublisherController {
  constructor(private readonly apksService: ApksService) {}

  @Get(':id')
  async apkOfPublisher(
    @Param('id') id: string,
    @Query() query: PaginationQuery,
    @UserLanguage() language: string,
  ) {
    const { apks, publisher } = await this.apksService.findByPublisherId(
      +id,
      +query.offset || 0,
      +query.limit || 10,
      language,
    );
    return ApiResponse.success({
      apks: ApkMapper.mapList(apks),
      publisher: PublisherMapper.mapOne(publisher),
    });
  }
}
