import { ArgumentMetadata, HttpException, PipeTransform } from '@nestjs/common';

export class CategorysValidationParamsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new HttpException(`${metadata.data} é obrigatório`, 404);
    }
    return value;
  }
}
