import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity, ActivityDocument } from './schema/activity.schema';

@Injectable()
export class WeeklyActivitiesService {
  constructor(
    @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>,
  ) {}

  async createActivity(createDto: any): Promise<Activity> {
    const newActivity = new this.activityModel(createDto);
    return newActivity.save();
  }

  async findAllActivities(): Promise<Activity[]> {
    return this.activityModel.find().exec();
  }

  async updateActivity(id: string, updateDto: any): Promise<Activity> {
    return this.activityModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
  }

  async deleteActivity(id: string): Promise<Activity> {
    const activity = await this.activityModel.findByIdAndDelete(id).exec();
    if (!activity) {
      throw new NotFoundException(`Activity with ID ${id} not found`);
    }
    return activity;
  }

  async addComment(activityId: string, comment: string): Promise<Activity> {
    return this.activityModel
      .findByIdAndUpdate(
        activityId,
        { $push: { comments: comment } },
        { new: true },
      )
      .exec();
  }
}
