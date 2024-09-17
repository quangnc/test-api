import { IsEnum, IsNotEmpty } from 'class-validator';
import { ADMIN_TYPE, USER_TYPE } from 'src/constants/user.types';

export class LoginPram {
  @IsNotEmpty()
  @IsEnum([USER_TYPE, ADMIN_TYPE])
  type: string;
}
