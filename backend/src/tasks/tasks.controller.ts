// /Users/erickmanrique/ErpConstruccion/backend/src/tasks/tasks.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(
    @Body()
    body: {
      name: string;
      area: string;
      priority: string;
      project: string;
    },
  ): Promise<Task> {
    return this.tasksService.createTask(
      body.name,
      body.area,
      body.priority,
      body.project,
    );
  }

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateData: Partial<Task>,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, updateData);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<Task> {
    return this.tasksService.deleteTask(id);
  }
}
