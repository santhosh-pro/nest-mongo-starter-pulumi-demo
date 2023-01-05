import { Module } from '@nestjs/common';
import { CatModule } from './cat/cat.module';
import { UnitOfWorkService } from './unit-of-work.service';
@Module({
  imports: [CatModule],
  providers: [UnitOfWorkService],
  exports: [CatModule, UnitOfWorkService]
})
export class MongoDbModule {}
