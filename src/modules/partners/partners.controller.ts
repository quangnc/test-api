import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
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
  create(@Body() createPartnerDto: CreatePartnerDto) {
    return this.partnerService.create(createPartnerDto);
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
  update(@Param('id') id: string, @Body() updatePartnerDto: UpdatePartnerDto) {
    return this.partnerService.update(+id, updatePartnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partnerService.remove(+id);
  }
}
