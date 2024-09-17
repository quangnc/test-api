import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from 'modules/apks/services/search.service';
import { SearchQuery } from 'modules/apks/requests/queries';
import { IsPublic } from 'src/common/decorators';
import { UserLanguage } from 'src/common/decorators/user-language.decorator';
import { ApkMapper } from 'src/mappers/apk.mapper';
import { removeDiacritics } from 'src/utils/string';

@Controller({
  path: 'search',
  version: '1',
})
@IsPublic()
export class SearchController {
  constructor(readonly searchService: SearchService) {}

  @Get('/')
  async search(@Query() query: SearchQuery, @UserLanguage() language) {
    const apks = await this.searchService.search(
      removeDiacritics(query.keyword),
      +query.offset,
      +query.limit,
      query.loadScreenshot == 'true',
      language,
    );
    return { apks: ApkMapper.mapList(apks) };
  }

  @Get('/recent')
  async recentSearch() {
    const keywords = await this.searchService.getRecent();
    return { keywords: keywords };
  }

  @Get('/trending')
  async trendingSearch() {
    const keywords = await this.searchService.getTrending();
    return { keywords: keywords };
  }
}
