import { Module } from '@nestjs/common';
import { MongoDbModule } from '@db/mongo-db.module';
import { RequestContextModule } from 'src/infra/request-context/request-context.module';
import { CreateCatMapper } from './create-cat/create-cat-mapper';
import { CreateCatController } from './create-cat/create-cat.controller';
import { GetCatListMapper } from './get-cat-list/get-cat-list-mapper';
import { GetCatListController } from './get-cat-list/get-cat-list.controller';

@Module({
  imports: [RequestContextModule, MongoDbModule],
  controllers: [CreateCatController, GetCatListController],
  providers: [CreateCatMapper, GetCatListMapper]
})
export class CatUseCasesModule {}
