import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigController } from './config.controller';
import { ConfigService } from './config.service';
import { Area, AreaSchema } from './schemas/area.schema';
import { Priority, PrioritySchema } from './schemas/priority.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Area.name, schema: AreaSchema }]),
    MongooseModule.forFeature([
      { name: Priority.name, schema: PrioritySchema },
    ]),
  ],
  controllers: [ConfigController],
  providers: [ConfigService],
})
export class ConfigModule {}
