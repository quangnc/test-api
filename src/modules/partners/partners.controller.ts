import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Multer } from 'multer';
import { PartnerService } from './partners.service';
import { IsPublic } from 'src/common/decorators';

@Controller({
  path: 'partners',
  version: '1',
})
@IsPublic()
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  // File upload configuration
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/partners',
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  create(
    @Body() createPartnerDto: CreatePartnerDto,
    @UploadedFile() file: Multer.File,
  ) {
    return this.partnerService.create(createPartnerDto, file);
  }

  @Get()
  findAll() {
    return this.partnerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partnerService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/partners',
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updatePartnerDto: UpdatePartnerDto,
    @UploadedFile() file: Multer.File,
  ) {
    return this.partnerService.update(+id, updatePartnerDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partnerService.remove(+id);
  }
}
