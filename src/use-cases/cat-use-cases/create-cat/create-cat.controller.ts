import { CatService } from '@db/cat/cat.service';
import { FoodService } from '@db/food/food.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UnitOfWorkService } from '@db/unit-of-work.service';
import { CreateCatMapper } from './create-cat-mapper';
import { CreateCatRequest } from './create-cat-request';

@ApiTags('cats')
@ApiBearerAuth()
@Controller('cats')
export class CreateCatController {
  constructor(
    private readonly catService: CatService,
    private readonly foodService: FoodService,
    private readonly mapper: CreateCatMapper,
    private readonly unitOfWorkService: UnitOfWorkService
  ) {}

  @Post()
  async create(@Body() createCatRequest: CreateCatRequest) {
    await this.unitOfWorkService.withRetrySession(async (session: any) => {
      const cat = this.mapper.mapToCat(createCatRequest);
      await this.catService.insert(cat, session);
      await this.foodService.insert(
        {
          name: 'f1',
          catId: this.foodService.toObjectId('6370a8cf04257e5851c2e4b4')
        },
        session
      );
    });
  }
}
