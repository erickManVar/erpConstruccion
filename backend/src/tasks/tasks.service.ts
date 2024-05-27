// /Users/erickmanrique/ErpConstruccion/backend/src/tasks/tasks.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async createTask(
    name: string,
    area: string,
    priority: string,
    project: string,
  ): Promise<Task> {
    const newTask = new this.taskModel({ name, area, priority, project });
    return newTask.save();
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskModel.find().populate('project').lean().exec();
  }

  async getTaskById(id: string): Promise<Task | null> {
    return this.taskModel.findById(id).populate('project').lean().exec();
  }

  async updateTask(
    id: string,
    updateData: Partial<Task>,
  ): Promise<Task | null> {
    return this.taskModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('project')
      .lean()
      .exec();
  }

  async deleteTask(id: string): Promise<Task | null> {
    return this.taskModel.findByIdAndDelete(id).lean().exec();
  }
}
