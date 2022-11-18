import { Cat } from '@db/cat/cat.schema';
import { CreateCatRequest } from './create-cat-request';

export class CreateCatMapper {
  public mapToCat(request: CreateCatRequest): Partial<Cat> {
    return {
      name: request.name,
      breed: request.breed,
      age: request.age
    };
  }
}
