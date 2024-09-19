import { IsEmail, IsNotEmpty } from 'class-validator';

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
