import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

export const ApiEmptySuccessResponse = () =>
  applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              success: { type: 'boolean' },
              data: { type: 'object' },
            },
          },
        ],
      },
    }),
  );
