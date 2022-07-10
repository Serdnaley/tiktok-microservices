import { ApiOperation } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export const ApiSummary = (summary: string) => applyDecorators(ApiOperation({ summary }));
