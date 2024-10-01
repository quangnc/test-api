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
import { CertificatesService } from './certificates.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { IsPublic } from 'src/common/decorators';
import { PaginationQuery } from 'src/common/requests/queries';
import { ApiResponse } from 'src/common/api.response';
import { UserLanguage } from 'src/common/decorators/user-language.decorator';

@Controller({
  path: 'certificates',
  version: '1',
})
@IsPublic()
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Post('/')
  create(@Body() createCertificateDto: CreateCertificateDto) {
    return this.certificatesService.create(createCertificateDto);
  }

  @Get('/')
  async findAll(
    @UserLanguage() language: string,
    @Query() query: PaginationQuery,
  ) {
    const { page = 1, limit = 10 } = query;
    const offset = (page - 1) * limit;
    const [certificates, totalItems] = await this.certificatesService.findAll(
      offset,
      limit,
    );

    return ApiResponse.success({
      pageSize: limit,
      total: totalItems,
      results: certificates,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.certificatesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCertificateDto: UpdateCertificateDto,
  ) {
    return this.certificatesService.update(+id, updateCertificateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.certificatesService.remove(+id);
  }
}
