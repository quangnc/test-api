import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Slider } from 'modules/sliders/entities/slider.entity';
import { Apk } from 'modules/apks/entities/apk.entity';

@Injectable()
export class SlidersService {
  constructor(
    @InjectRepository(Slider) public sliderRepo: Repository<Slider>,
    @InjectRepository(Apk) public apkRepo: Repository<Apk>,
  ) {}

  async findAll(locale: string) {
    const sliders = await this.sliderRepo.find({ order: { priority: 'DESC' } });

    const sliderApkIds = sliders.map((s) => s.apkId).filter((id) => id);

    if (sliderApkIds.length) {
      const apks = await this.apkRepo
        .createQueryBuilder()
        .whereInIds(sliderApkIds)
        .innerJoinAndSelect(
          'Apk.infos',
          'ApkInfo',
          "Apk.id=ApkInfo.apkId AND (ApkInfo.locale=:locale OR ApkInfo.locale='en')",
          {
            locale,
          },
        )
        .getMany();

      for (const slider of sliders) {
        if (slider.apkId) {
          slider.apk = apks.find((apk) => apk.id == slider.apkId);
        }
      }
    }

    return sliders;
  }
}
