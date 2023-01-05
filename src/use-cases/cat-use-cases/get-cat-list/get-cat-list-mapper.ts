import { SortingDirection } from '@common/sorting-direction';
import { Cat } from '@db/cat/cat.schema';
import { PagedModel } from '@db/helper';
import { GetCatListResponse } from './get-cat-list-response';

export class GetCatListMapper {
  public mapToCatListResponse(request: PagedModel<Cat>): GetCatListResponse {
    const response: GetCatListResponse = {
      orderByPropertyName: request.orderByPropertyName,
      sortingDirection: SortingDirection.Ascending,
      pageNumber: request.pageNumber,
      pageSize: request.pageSize,
      totalCount: request.totalCount,
      totalPages: request.totalPages,
      items: request.items.map((x) => {
        return {
          id:x.id,
          name: x.name,
          age: x.age,
          breed: x.breed
        };
      })
    };
    return response;
  }
}
