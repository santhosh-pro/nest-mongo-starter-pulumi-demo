import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CatService } from '@db/cat/cat.service';
import { GetCatListMapper } from './get-cat-list-mapper';
import { GetCatListRequest } from './get-cat-list-request';

@ApiTags('cats')
@ApiBearerAuth()
@Controller('cats')
export class GetCatListController {
  constructor(
    private readonly catService: CatService,
    private readonly mapper: GetCatListMapper
  ) {}

  @Get()
  async get(@Query() query: GetCatListRequest): Promise<any> {
    const result = await this.catService.pagedAsync(
      query.pageNumber,
      query.pageSize,
      query.orderByPropertyName,
      query.sortingDirection,
      {}
    );
    const response = this.mapper.mapToCatListResponse(result);
    return response;
  }
}
