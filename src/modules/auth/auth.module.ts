import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { JWT_ALIVE_TIME, JWT_SECRET } from 'src/configs';
import { Admin } from 'modules/auth/entities/admin.entity';

@Module({
  imports: [
    // import models
    TypeOrmModule.forFeature([User, Token, Admin]),
    // import jwt
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: `${JWT_ALIVE_TIME}s` },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AuthService, JwtStrategy, UserService],
  controllers: [AuthController],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
