import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FiskDragDocument = HydratedDocument<FiskDrag>;

@Schema()
export class FiskDrag {

  @Prop({ required: true })
  artikelnummer: string;

  @Prop()
  Tillverkare: string;

  @Prop()
  pris: number;

  @Prop()
  typ: string;
}

export const FiskDragSchema = SchemaFactory.createForClass(FiskDrag);