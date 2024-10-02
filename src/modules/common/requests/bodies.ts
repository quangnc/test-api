import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Column } from 'typeorm';

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

export class CreateSliderBody {
  @IsOptional()
  public url: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @Column({ default: 1 })
  priority: number;

  @Column({ default: true })
  isActive: number;
}
