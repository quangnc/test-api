import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

function response(status: boolean, r: IResponseData) {
  return {
    ...(r.data ?? {}),
    ...(r.message ? { message: r.message } : {}),
    ...(r.error ? { error: r.error } : {}),
  };
}

export interface IResponseData {
  data?: any;
  message?: string | string[];
  error?: string;
  code?: number;
}

export const ApiResponse = {
  success(data: string | number | boolean | Record<any, any>) {
    return response(true, { data });
  },
  badRequest(r: IResponseData) {
    throw new BadRequestException(response(false, r));
  },
  unprocessable(r: IResponseData) {
    throw new UnprocessableEntityException(response(false, r));
  },
  notFound(r: IResponseData) {
    throw new NotFoundException(response(false, r));
  },
  forbidden(r: IResponseData) {
    throw new ForbiddenException(response(false, r));
  },
  unAuthenticated(r: IResponseData) {
    throw new UnauthorizedException(response(false, r));
  },
  deleted(message: string) {
    return response(true, { message });
  },
};
