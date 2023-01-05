import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestContextModule } from 'src/infra/request-context/request-context.module';
import { RequestContextService } from 'src/infra/request-context/request-context.service';
import { Cat, CatSchema } from './cat.schema';
import { CatService } from './cat.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Cat.name,
        inject: [RequestContextService],
        useFactory: (requestContextService: RequestContextService) => {
          const schema = CatSchema;
          schema.pre<Cat>('save', function () {
            this.createdBy = requestContextService.getUserId();
            this.modifiedBy = requestContextService.getUserId();
          });
          return schema;
        },
        imports: [RequestContextModule]
      }
    ])
  ],
  providers: [CatService],
  exports: [CatService]
})
export class CatModule {}
