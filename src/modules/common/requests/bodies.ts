import { IsEmail, IsNotEmpty, IsEnum, IsOptional, ValidateIf, IsIn} from 'class-validator';
import { ApkType } from 'modules/apks/entities/apk.entity';
import { Order } from 'src/common/enums';
import { ApkTopList } from 'modules/apks/enums';
import { ApkListType } from 'modules/apks/entities/apk-list-top.entity'
import { PaginationQuery } from 'src/common/requests/queries';
import { SourceApk } from 'src/common/enums'

export class CreateContactBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  reason: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  message: string;
}

export class ListTopQuery extends PaginationQuery{
  @IsEnum(ApkType)
  type: string

  @IsEnum(SourceApk)
  source: string

  @ValidateIf(o => o.source === SourceApk.INTERNAL)
  @IsEnum(ApkTopList)
  title: string

  @ValidateIf(o => o.source === SourceApk.EXTERNAL)
  @IsEnum(ApkListType)
  top: string

  @IsOptional()
  keyword: string

  @IsEnum(Order)
  @IsOptional()
  order: string;

  @IsIn([
    'createdAt',
  ])
  @IsOptional()
  sortBy: string; 
}