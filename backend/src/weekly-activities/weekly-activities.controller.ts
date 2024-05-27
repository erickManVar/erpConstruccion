// Ubicación: /Users/erickmanrique/ErpConstruccion/backend/src/weekly-activities/weekly-activities.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { WeeklyActivitiesService } from './weekly-activities.service';

@Controller('activities')
export class WeeklyActivitiesController {
  constructor(
    private readonly weeklyActivitiesService: WeeklyActivitiesService,
  ) {}

  @Post()
  async createActivity(@Body() createDto: any) {
    return this.weeklyActivitiesService.createActivity(createDto);
  }

  @Get()
  async getAllActivities() {
    return this.weeklyActivitiesService.findAllActivities();
  }

  @Put(':id')
  async updateActivity(@Param('id') id: string, @Body() updateDto: any) {
    return this.weeklyActivitiesService.updateActivity(id, updateDto);
  }

  @Delete(':id')
  async deleteActivity(@Param('id') id: string) {
    return this.weeklyActivitiesService.deleteActivity(id);
  }

  @Post(':id/comment')
  async addComment(
    @Param('id') activityId: string,
    @Body('comment') comment: string,
  ) {
    return this.weeklyActivitiesService.addComment(activityId, comment);
  }
}
