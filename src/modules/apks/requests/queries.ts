import { PaginationQuery } from 'src/common/requests/queries';
import { IsEnum, IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';
import { Order } from 'src/common/enums';
import { ApkType } from 'modules/apks/entities/apk.entity';

export class ListApksQuery extends PaginationQuery {
  @IsEnum(ApkType)
  @IsOptional()
  type: string;

  @IsNumberString()
  @IsOptional()
  categoryId: string;

  @IsEnum(Order)
  @IsOptional()
  order: string;

  @IsIn([
    'createdAt',
    'type',
    'avgRate',
    'reviewsCount',
    'downloadsCount',
    'price',
    'salePrice',
    'viewsCount',
  ])
  @IsOptional()
  sortBy: string;
}

export class GetCollectionQuery extends PaginationQuery {
  @IsEnum(Order)
  @IsOptional()
  order: string;

  @IsIn([
    'createdAt',
    'type',
    'avgRate',
    'reviewsCount',
    'downloadCounts',
    'price',
    'salePrice',
    'viewsCount',
  ])
  @IsOptional()
  sortBy: string;
}

export class SearchQuery extends PaginationQuery {
  @IsOptional()
  @IsString()
  keyword: string;

  @IsOptional()
  @IsIn(['true', 'false'])
  loadScreenshot: string;
}
