import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApkStat } from 'modules/apks/entities/apk-stat.entify';

@Injectable()
export class StatsService {
  constructor(@InjectRepository(ApkStat) public apkStatRepo: Repository<ApkStat>) {}

  async incStat(apkId: number, time: Date, type: 'views' | 'downloads') {
    time.setSeconds(0);
    time.setMilliseconds(0);
    time.setMinutes(0);
    let stat = await this.apkStatRepo.findOneBy({ apkId, time });
    if (!stat) {
      const props = { apkId, downloads: 0, time, type, views: 0 };
      props[type] = 1;

      stat = this.apkStatRepo.create(props);
      await stat.save();
      return;
    }

    if (type == 'views') {
      stat.views++;
    } else if (type == 'downloads') {
      stat.downloads++;
    }
    await stat.save();
  }
}
