import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceCategory } from './entities/service-type.entity';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';

@Injectable()
export class ServiceCategoryService {
  constructor(
    @InjectRepository(ServiceCategory)
    private readonly serviceCategoryRepository: Repository<ServiceCategory>,
  ) {}

  async create(
    createServiceCategoryDto: CreateServiceCategoryDto,
  ): Promise<ServiceCategory> {
    const serviceCategory = this.serviceCategoryRepository.create(
      createServiceCategoryDto,
    );
    return await this.serviceCategoryRepository.save(serviceCategory);
  }

  async findAll(): Promise<ServiceCategory[]> {
    return await this.serviceCategoryRepository.find({
      relations: ['services'],
    });
  }

  async findOne(id: number): Promise<ServiceCategory> {
    const serviceCategory = await this.serviceCategoryRepository.findOneOrFail({
      where: { id },
      relations: ['services'],
    });
    if (!serviceCategory) {
      throw new NotFoundException(`Service Category with ID ${id} not found`);
    }
    return serviceCategory;
  }

  async update(
    id: number,
    updateServiceCategoryDto: UpdateServiceCategoryDto,
  ): Promise<ServiceCategory> {
    const serviceCategory = await this.serviceCategoryRepository.preload({
      id,
      ...updateServiceCategoryDto,
    });
    if (!serviceCategory) {
      throw new NotFoundException(`Service Category with ID ${id} not found`);
    }
    return await this.serviceCategoryRepository.save(serviceCategory);
  }

  async remove(id: number): Promise<void> {
    const result = await this.serviceCategoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Service Category with ID ${id} not found`);
    }
  }
}
