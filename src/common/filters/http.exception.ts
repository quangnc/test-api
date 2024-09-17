import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const res = exception.getResponse() as any;
    let messages = res.message;

    if (typeof messages === 'string') {
      messages = [messages];
    }

    let error = res.error || res.message || '';
    error = (error[0].toLowerCase() + error.slice(1)).replace(/ /g, '');

    response.status(status).json({
      status: false,
      messages,
      error,
    });
  }
}
