import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Partner } from './entities/partner.entity';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,
  ) {}

  async create(createPartnerDto: CreatePartnerDto) {
    const partnerData = { ...createPartnerDto };

    const partner = this.partnerRepository.create(partnerData);
    return this.partnerRepository.save(partner);
  }

  async findAll(): Promise<Partner[]> {
    return this.partnerRepository.find();
  }

  async findOne(id: number): Promise<Partner> {
    const partner = await this.partnerRepository.findOne({ where: { id } });
    if (!partner) {
      throw new NotFoundException(`Partner with ID ${id} not found`);
    }
    return partner;
  }

  async update(
    id: number,
    updatePartnerDto: UpdatePartnerDto,
  ): Promise<Partner> {
    const partner = await this.partnerRepository.findOne({ where: { id } });
    if (!partner) {
      throw new NotFoundException(`Partner with ID ${id} not found`);
    }

    Object.assign(partner, updatePartnerDto);
    return this.partnerRepository.save(partner);
  }

  async remove(id: number): Promise<void> {
    const partner = await this.partnerRepository.findOne({ where: { id } });
    if (!partner) {
      throw new NotFoundException(`Partner with ID ${id} not found`);
    }
    await this.partnerRepository.remove(partner);
  }
}
