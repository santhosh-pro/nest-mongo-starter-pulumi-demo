import { PagedResponse } from 'src/use-cases/paged-response';

export class GetCatListResponse extends PagedResponse {
  items: { name: string; age: number; breed: string }[];
}