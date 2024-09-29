import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { ServiceLocales } from './entities/service-locales.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Multer } from 'multer';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(ServiceLocales)
    private readonly serviceLocalesRepository: Repository<ServiceLocales>,
  ) {}

  // Create a service with translations and file upload
  async create(
    createServiceDto: CreateServiceDto,
    file: Multer.File,
  ): Promise<Service> {
    const { locales, ...serviceData } = createServiceDto;

    // File handling (you can store the file path in the `url` field)
    if (file) {
      serviceData.url = file.path; // or any file handling logic
    }

    const service = this.serviceRepository.create(serviceData);

    // Create translations
    service.locales = locales.map((locale) =>
      this.serviceLocalesRepository.create(locale),
    );

    return this.serviceRepository.save(service);
  }

  // Find all services with their translations
  async findAll(): Promise<Service[]> {
    return this.serviceRepository.find({ relations: ['locales'] });
  }

  // Find one service with its translations
  async findOne(id: number, lang: string) {
    const service = await this.serviceRepository.findOne({
      where: { serviceId: id },
      relations: ['locales'],
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    // Filter translations by language
    const translation = service.locales.find((t) => t.locale === lang);

    if (!translation) {
      throw new NotFoundException(`Translation for language ${lang} not found`);
    }

    return { ...service, ...translation };
  }

  // Update a service with translations and file upload
  async update(
    id: number,
    updateServiceDto: UpdateServiceDto,
    file: Multer.File,
  ): Promise<Service> {
    const { locales, ...serviceData } = updateServiceDto;

    const service = await this.serviceRepository.findOne({
      where: { serviceId: id },
      relations: ['locales'],
    });
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    // Update file if exists
    if (file) {
      serviceData.url = file.path; // Handle file
    }

    Object.assign(service, serviceData);

    // Update translations
    if (locales) {
      service.locales = locales.map((locale) =>
        this.serviceLocalesRepository.create(locale),
      );
    }

    return this.serviceRepository.save(service);
  }

  // Delete a service
  async remove(id: number): Promise<void> {
    const service = await this.serviceRepository.findOne({
      where: { serviceId: id },
    });
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    await this.serviceRepository.remove(service);
  }
}
