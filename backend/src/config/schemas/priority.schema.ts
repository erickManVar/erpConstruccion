import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PriorityDocument = Priority & Document;

@Schema()
export class Priority {
  @Prop({ required: true })
  name: string;
}

export const PrioritySchema = SchemaFactory.createForClass(Priority);
