import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CheckTokenBody {
  @IsNotEmpty()
  token: string;
}

export class LoginBody {
  @IsNotEmpty()
  identify: string;

  @IsNotEmpty()
  password: string;
}

export class SocialLoginBody {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  device: string;
}

export class MetamaskLoginBody {
  @IsNotEmpty()
  sig: string;

  @IsNotEmpty()
  publicAddress: string;
}

export class RegisterUserBody {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  device: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsString()
  locale = 'en';
}
