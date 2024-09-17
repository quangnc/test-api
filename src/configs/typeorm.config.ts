import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import {
  DATABASE_URL,
  IS_PRODUCTION,
  REDIS_API_URL,
  REDIS_ENABLE,
} from '@configs/index';

const redisConfig: any = {
  type: 'redis',
  options: {
    url: REDIS_API_URL,
  },
};

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: DATABASE_URL,
  synchronize: IS_PRODUCTION ? false : true,
  autoLoadEntities: true,
  logging: !IS_PRODUCTION,
  ssl: IS_PRODUCTION ? { rejectUnauthorized: false } : false,
};

export default new DataSource({
  type: 'postgres',
  url: DATABASE_URL,
  logging: !IS_PRODUCTION,
  ssl: IS_PRODUCTION ? { rejectUnauthorized: false } : false,
  entities: ['dist/**/**.entity{.ts,.js}'],
  migrations: [],
});
