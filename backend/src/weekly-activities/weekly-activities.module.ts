// Ubicación: src/weekly-activities/weekly-activities.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WeeklyActivitiesController } from './weekly-activities.controller';
import { WeeklyActivitiesService } from './weekly-activities.service';
import { Activity, ActivitySchema } from './schema/activity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Activity.name, schema: ActivitySchema },
    ]),
  ],
  controllers: [WeeklyActivitiesController],
  providers: [WeeklyActivitiesService],
})
export class WeeklyActivitiesModule {}
