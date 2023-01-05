import { PagedResponse } from 'src/use-cases/paged-response';

export class GetCatListResponse extends PagedResponse {
  items: {id:string; name: string; age: number; breed: string }[];
}