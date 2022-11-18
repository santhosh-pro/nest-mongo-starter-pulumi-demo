import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Food } from '../food/food.schema';

export type CatDocument = HydratedDocument<Cat>;

@Schema({
  timestamps: true
})
export class Cat {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;

  @Prop()
  createdBy: string;

  @Prop()
  modifiedBy: string;

  foods: Food[];
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('foods', {
  ref: Food.name,
  localField: '_id',
  foreignField: 'catId'
});
