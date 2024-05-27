// /Users/erickmanrique/ErpConstruccion/backend/src/tasks/schemas/task.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Project } from 'src/projects/schemas/project.schema';

@Schema()
export class Task {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  area: string;

  @Prop({ required: true })
  priority: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  project: Project;
}

export type TaskDocument = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);
