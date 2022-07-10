import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiPaginateResponse = <TModel extends Type>(model: TModel) =>
  applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [{
          properties: {
            success: { type: 'boolean' },
            limit: { type: 'number' },
            total: { type: 'number' },
            offset: { type: 'number' },
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(model) },
            },
          },
        }],
      },
    }),
  );
