import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserLanguage = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.query.lang || req.headers['accept-language'] || 'en';
});
