import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Slider } from 'modules/sliders/entities/slider.entity';

@Injectable()
export class SlidersService {
  constructor(
    @InjectRepository(Slider) public sliderRepo: Repository<Slider>,
  ) {}

  async findAll(locale: string) {
    const sliders = await this.sliderRepo.find({ order: { priority: 'DESC' } });

    return sliders;
  }
}
