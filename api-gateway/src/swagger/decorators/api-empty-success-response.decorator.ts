import { ApiOkResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

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
