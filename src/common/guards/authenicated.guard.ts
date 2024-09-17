import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthenticatedGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest(err, user, info, context) {
    const isPublicHandler = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (!isPublicHandler) {
      const isPublicClass = this.reflector.get<boolean>('isPublic', context.getClass());
      if (isPublicClass) {
        return user || true;
      }
    }

    if (isPublicHandler) {
      return true;
    }

    return super.handleRequest(err, user, info, context);
  }
}
