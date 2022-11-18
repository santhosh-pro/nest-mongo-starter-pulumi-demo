import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestContextModule } from 'src/infra/request-context/request-context.module';
import { RequestContextService } from 'src/infra/request-context/request-context.service';
import { Food, FoodSchema } from './food.schema';
import { FoodService } from './food.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Food.name,
        inject: [RequestContextService],
        useFactory: (requestContextService: RequestContextService) => {
          const schema = FoodSchema;
          schema.pre<Food>('save', function () {
            this.createdBy = requestContextService.getUserId();
            this.modifiedBy = requestContextService.getUserId();
          });
          schema.pre<Food>('update', function () {
            this.modifiedBy = requestContextService.getUserId();
          });
          return schema;
        },
        imports: [RequestContextModule]
      }
    ])
  ],
  providers: [FoodService],
  exports: [FoodService]
})
export class FoodModule {}
