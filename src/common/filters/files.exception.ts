import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class FilesExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(403).send(`<!DOCTYPE html>
<html lang="en">
<head><title>403 Forbidden</title></head>
<body><h1>403 Forbidden!</h1>
</body>
</html>
    `);
  }
}
