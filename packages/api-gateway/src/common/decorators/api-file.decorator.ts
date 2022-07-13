import { ApiBody } from '@nestjs/swagger';

export const ApiFile = (options: { name: string; type?: string; format?: string }[]): MethodDecorator => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  const properties = {};

  for (const option of options) {
    properties[option.name] = {
      type: option.type || 'string',
      format: option.format || 'binary',
    };
  }

  ApiBody({
    schema: {
      type: 'object',
      properties,
    },
  })(target, propertyKey, descriptor);
};
