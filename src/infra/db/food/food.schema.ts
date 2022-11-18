import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Cat } from '../cat/cat.schema';
export type FoodDocument = HydratedDocument<Food>;

@Schema({
  timestamps: true
})
export class Food {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: ObjectId,
    ref: 'Cat',
    required: true
  })
  catId: ObjectId;

  @Prop()
  createdBy: string;

  @Prop()
  modifiedBy: string;

  cat: Cat;
}

export const FoodSchema = SchemaFactory.createForClass(Food);

FoodSchema.virtual('cat', {
  ref: 'Cat',
  localField: 'catId',
  foreignField: '_id',
  justOne: true
});
