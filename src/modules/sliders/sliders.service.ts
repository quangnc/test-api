import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Slider } from 'modules/sliders/entities/slider.entity';
import { CreateSliderBody } from '../common/requests/bodies';

@Injectable()
export class SlidersService {
  constructor(
    @InjectRepository(Slider) public sliderRepo: Repository<Slider>,
  ) {}

  async findAll(locale: string) {
    const sliders = await this.sliderRepo.find({ order: { priority: 'DESC' } });

    return sliders;
  }

  async createSliders(createNewsDto: CreateSliderBody) {
    const document = this.sliderRepo.create({
      ...createNewsDto, // Lưu các trường name, description
    });

    return this.sliderRepo.save(document);
  }
}
