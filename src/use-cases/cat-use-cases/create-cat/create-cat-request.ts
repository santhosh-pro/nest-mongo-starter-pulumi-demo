import { ApiProperty } from '@nestjs/swagger';

export class CreateCatRequest {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  breed: string;
}
