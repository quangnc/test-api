import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApiResponse } from 'src/common/api.response';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles =
      this.reflector.get<string[]>('roles', context.getClass()) ||
      this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const hasRole = (user.roles || []).some((r) => roles.includes(r));

    if (!hasRole) {
      ApiResponse.forbidden({
        error: 'forbidden',
        message: 'Permission denied',
      });
    }
    return true;
  }
}
