import { Module } from '@nestjs/common';
import { SlidersService } from './sliders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slider } from 'modules/sliders/entities/slider.entity';

@Module({
  controllers: [],
  providers: [SlidersService],
  imports: [TypeOrmModule.forFeature([Slider])],
  exports: [SlidersService],
})
export class SlidersModule {}
