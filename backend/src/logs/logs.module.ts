import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { Log, LogSchema } from './schemas/log.schema';
import { UsersModule } from '../users/users.module'; // Import UsersModule
import { User, UserSchema } from '../users/schemas/user.schema'; // Import User schema

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersModule, // Add UsersModule to the imports
  ],
  controllers: [LogsController],
  providers: [LogsService],
})
export class LogsModule {}
