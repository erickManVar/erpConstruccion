import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Log {
  @Prop({ required: true })
  itemId: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true })
  createdBy: string;  // This will be the user's name
}

export type LogDocument = Log & Document;
export const LogSchema = SchemaFactory.createForClass(Log);
