import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginBody, RegisterUserBody } from '../requests/bodies';
import { USER_TYPE } from 'src/constants/user.types';
import { JwtStrategy } from '../jwt.strategy';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserStatus } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Token } from '../entities/token.entity';
import { UserService } from './user.service';
import { JWT_ALIVE_TIME } from 'src/configs';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) public userRepo: Repository<User>,
    @InjectRepository(Token) public tokenModel: Repository<Token>,
    private jwtService: JwtService,
    private jwtStrategy: JwtStrategy,
    private userService: UserService,
  ) {}

  async registerUser(body: RegisterUserBody) {
    const isExists = await this.userRepo.findOne({
      where: [{ email: body.email }, { username: body.username }],
    });
    if (isExists) {
      return 'emailOrUsernameAlreadyExists';
    }

    const userResult = await this.userRepo.insert({
      ...body,
      status: UserStatus.active,
    });
    if (userResult) {
      const user = await this.userService.findById(userResult.raw.id);
      const token = this.createToken({
        id: user.id,
        type: USER_TYPE,
      });
      return { user, token, tokenExpireAt: Date.now() + JWT_ALIVE_TIME };
    }
    return 'errorWhenCreateUser';
  }

  // just using for test apis
  async loginAsUser({ identify, password }: LoginBody): Promise<any> {
    const user = await this.userRepo.findOne({
      where: [
        { email: identify, status: UserStatus.active },
        { username: identify, status: UserStatus.active },
      ],
    });
    if (!user || !comparePassword(password, user.password)) {
      return null;
    }

    const token = this.createToken({
      id: user.id,
      type: USER_TYPE,
    });

    return { user: user, token, tokenExpireAt: Date.now() + JWT_ALIVE_TIME };
  }

  createToken({ id, type }) {
    return this.jwtService.sign({ id, type });
  }

  async verifyToken(token) {
    try {
      const payload = this.jwtService.verify(token);
      const res = await this.jwtStrategy.validate(payload);
      return res as any;
    } catch (e) {
      return 'invalidToken';
    }
  }

  uriQueryEncode(obj: object): string {
    return Object.keys(obj)
      .map((k) => `${k}=${encodeURIComponent(obj[k])}`)
      .join('&');
  }
}
