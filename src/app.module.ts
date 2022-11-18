import { UseCasesModule } from './use-cases/use-cases.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mongo:mongopass@cluster0.qcwqti5.mongodb.net/test?retryWrites=true&w=majority'
    ),
    UseCasesModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
