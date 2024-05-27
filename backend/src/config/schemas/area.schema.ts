import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AreaDocument = Area & Document;

@Schema()
export class Area {
  @Prop({ required: true })
  name: string;
}

export const AreaSchema = SchemaFactory.createForClass(Area);
