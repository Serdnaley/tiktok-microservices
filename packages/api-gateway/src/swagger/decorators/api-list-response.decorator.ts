import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiListResponse = <TModel extends Type>(model: TModel) =>
  applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [{
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(model) },
            },
          },
        }],
      },
    }),
  );
