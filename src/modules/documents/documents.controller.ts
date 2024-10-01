import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse } from 'src/common/api.response';
import { IsPublic } from 'src/common/decorators';
import { PaginationQuery } from 'src/common/requests/queries';
import { DocumentsService } from './documents.service';
import { DocumentMapper } from 'src/mappers/document.mapper';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateDocumentDto } from './requests/queries';

@Controller({
  path: 'documents',
  version: '1',
})
@IsPublic()
export class DocumentsController {
  constructor(private docService: DocumentsService) {}

  @Get('/')
  @IsPublic()
  async list(@Query() query: PaginationQuery) {
    const { page = 1, limit = 10 } = query;
    const offset = (page - 1) * limit;
    const [docs, totalItems] = await this.docService.findAll(offset, limit);

    return ApiResponse.success({
      page,
      pageSize: limit,
      total: totalItems,
      results: DocumentMapper.mapList(docs),
    });
  }

  @Get(':id')
  async getDetail(@Param('id') id: string) {
    const doc = await this.docService.getDetail(id);
    return ApiResponse.success({
      article: DocumentMapper.mapOne(doc),
    });
  }

  @Post('create')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/docs', // Nơi lưu file
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname); // Lấy phần mở rộng file
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file,
    @Body() createDocumentDto: CreateDocumentDto,
  ): Promise<any> {
    if (!file) {
      return ApiResponse.badRequest({
        error: 'badRequest',
        message: 'Create docs need to provide the file',
      });
    }
    const doc = await this.docService.create(createDocumentDto, file.filename);
    return ApiResponse.success({
      doc: DocumentMapper.mapOne(doc),
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const isOk = await this.docService.remove(+id);
    if (isOk) {
      return ApiResponse.deleted('Delete Document');
    }
    return ApiResponse.notFound({
      message: 'Document not found',
      error: 'notFound',
    });
  }

  @Put(':id')
  async reaction(
    @Param('id') id,
    @Body() updateDocumentDto: CreateDocumentDto,
  ) {
    const doc = await this.docService.update(id, updateDocumentDto);
    return ApiResponse.success({
      doc: DocumentMapper.mapOne(doc),
    });
  }
}
