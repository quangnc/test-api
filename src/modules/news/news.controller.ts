import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { IsPublic } from 'src/common/decorators';
import { PaginationQuery } from 'src/common/requests/queries';
import { ApiResponse } from 'src/common/api.response';
import { News } from './entities/news.entity';

@Controller({
  path: 'news',
  version: '1',
})
@IsPublic()
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  // File upload configuration
  @Post()
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Get()
  async findAll(
    @Query('language') language: string,
    @Query('keyword') keyword: string,
    @Query('type') type: string,
    @Query() query: PaginationQuery,
  ) {
    const { page = 1, limit = 10 } = query;
    const offset = (page - 1) * limit;
    const news = await this.newsService.findAll(
      offset,
      limit,
      language,
      +type,
      keyword,
    );

    return ApiResponse.success({
      page,
      pageSize: limit,
      total: await News.count(),
      results: news,
    });
  }

  @Get(':id')
  findOne(@Query('language') language: string, @Param('id') id: string) {
    return this.newsService.findOne(+id, language);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(+id, updateNewsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
