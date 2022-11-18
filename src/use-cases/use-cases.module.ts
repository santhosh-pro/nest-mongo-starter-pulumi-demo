import { Module } from '@nestjs/common';
import { CatUseCasesModule } from './cat-use-cases/cat-use-cases.module';

@Module({
  imports: [CatUseCasesModule],
  controllers: [],
  providers: []
})
export class UseCasesModule {}
