import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Area, AreaDocument } from './schemas/area.schema';
import { Priority, PriorityDocument } from './schemas/priority.schema';

@Injectable()
export class ConfigService {
  getAreas() {
    throw new Error('Method not implemented.');
  }
  getPriorities() {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(Area.name) private areaModel: Model<AreaDocument>,
    @InjectModel(Priority.name) private priorityModel: Model<PriorityDocument>,
  ) {}

  // Métodos para manejar áreas
  // Métodos para manejar prioridades
}
