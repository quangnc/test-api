import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { IResponseData, ApiResponse } from 'src/common/api.response';
import { LIST_USER_TYPES, USER_TYPE } from 'src/constants/user.types';
import { IsPublic } from 'src/common/decorators/role.decorator';
import { LoginPram } from '../requests/params';
import {
  CheckTokenBody,
  LoginBody,
  RegisterUserBody,
} from '../requests/bodies';
import { UserMapper } from 'src/mappers/user.mapper';

@Controller({
  path: 'auth',
  version: '1',
})
@IsPublic()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(':type/login')
  async login(
    @Body() credentials: LoginBody,
    @Param() params: LoginPram,
  ): Promise<IResponseData> {
    if (!params.type || LIST_USER_TYPES.indexOf(params.type) === -1) {
      return ApiResponse.badRequest({
        error: 'invalidLoginType',
        message: `valid types: ${LIST_USER_TYPES.join(', ')}`,
      });
    }

    let data;

    if (params.type === USER_TYPE) {
      data = await this.authService.loginAsUser(credentials);
    }

    if (data) {
      return ApiResponse.success({
        ...data,
        user: UserMapper.mapOne(data.user),
      });
    }

    return ApiResponse.unprocessable({
      error: 'incorrectCredentials',
    });
  }

  @Post('/register')
  async registerUser(@Body() body: RegisterUserBody) {
    const res = await this.authService.registerUser(body);
    if (res && typeof res != 'string') {
      return ApiResponse.success({
        ...res,
        user: UserMapper.mapOne(res.user),
      });
    }
    return ApiResponse.unAuthenticated({
      message: 'Error when register new user',
      error: res as string,
    });
  }

  @Post('/verify-token')
  async checkToken(@Body() { token }: CheckTokenBody) {
    const res = await this.authService.verifyToken(token);
    if (typeof res == 'string') {
      return ApiResponse.unprocessable({
        error: res,
        message: res.replace(/_/g, ' '),
      });
    }

    return ApiResponse.success({
      user: res,
    });
  }
}
