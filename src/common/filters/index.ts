import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/common/filters/http.exception';
import { EntityNotFoundFilter } from 'src/common/filters/entity.exception';
import { Provider } from '@nestjs/common';

export default <Provider[]>[
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: EntityNotFoundFilter,
  },
];
