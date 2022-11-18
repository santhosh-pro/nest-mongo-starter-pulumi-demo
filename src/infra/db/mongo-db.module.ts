import { Module } from '@nestjs/common';
import { CatModule } from './cat/cat.module';
import { FoodModule } from './food/food.module';
import { UnitOfWorkService } from './unit-of-work.service';
@Module({
  imports: [CatModule, FoodModule],
  providers: [UnitOfWorkService],
  exports: [CatModule, FoodModule, UnitOfWorkService]
})
export class MongoDbModule {}
