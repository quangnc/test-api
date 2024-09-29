import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificate } from './entities/certificate.entity';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectRepository(Certificate)
    private readonly certificateRepository: Repository<Certificate>,
  ) {}

  async create(
    createCertificateDto: CreateCertificateDto,
  ): Promise<Certificate> {
    const certificate = this.certificateRepository.create(createCertificateDto);
    return await this.certificateRepository.save(certificate);
  }

  async findAll(
    offset: number,
    limit: number,
  ): Promise<[Certificate[], number]> {
    const data = await this.certificateRepository.findAndCount({
      skip: offset,
      take: limit,
    });
    return data;
  }

  async findOne(id: number): Promise<Certificate> {
    const certificate = await this.certificateRepository.findOneOrFail({
      where: {
        id: +id,
      },
    });
    if (!certificate) {
      throw new NotFoundException(`Certificate with ID ${id} not found`);
    }
    return certificate;
  }

  async update(
    id: number,
    updateCertificateDto: UpdateCertificateDto,
  ): Promise<Certificate> {
    const certificate = await this.certificateRepository.preload({
      id,
      ...updateCertificateDto,
    });
    if (!certificate) {
      throw new NotFoundException(`Certificate with ID ${id} not found`);
    }
    return await this.certificateRepository.save(certificate);
  }

  async remove(id: number): Promise<void> {
    const result = await this.certificateRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Certificate with ID ${id} not found`);
    }
  }
}
