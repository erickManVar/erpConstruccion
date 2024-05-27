// Ubicación: /Users/erickmanrique/ErpConstruccion/backend/src/weekly-activities/schema/activity.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ActivityDocument = Activity & Document;

@Schema()
export class Activity {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ required: true })
  status: string; // 'Pendiente', 'En Proceso', 'Terminado'

  @Prop({ required: true })
  onBudget: boolean;

  @Prop({ required: true })
  project: string;

  @Prop({ required: true })
  createdBy: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  comments: string[];
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
