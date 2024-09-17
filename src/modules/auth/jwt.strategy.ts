import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { USER_TYPE } from 'src/constants/user.types';
import { AuthService } from './services/auth.service';
import { ConfigService } from '@nestjs/config';
import { UserService } from './services/user.service';

interface ValidatedClient {
  [key: string]: any;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private userService: UserService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload): Promise<ValidatedClient> {
    const { type, id } = payload;

    let user: ValidatedClient = null;
    // check for user token
    if (type === USER_TYPE) {
      user = await this.userService.findById(id);
    } else {
      // TODO: find admin
    }

    if (!user) {
      throw new UnauthorizedException();
    }
    user.type = type;
    return user;
  }
}
