import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from './schemas/log.schema';
import { CreateLogDto } from './dto/create-log.dto';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class LogsService {
  constructor(
    @InjectModel(Log.name) private logModel: Model<LogDocument>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createLogDto: CreateLogDto, user: any): Promise<LogDocument> {
    const log = new this.logModel({
      ...createLogDto,
      createdBy: JSON.stringify({ _id: user.sub, name: user.name }), // Ensure correct fields are used
    });
    return log.save();
  }

  async findByItemId(itemId: string): Promise<LogDocument[]> {
    return this.logModel.find({ itemId }).exec();
  }

  async update(id: string, content: string): Promise<LogDocument> {
    const log = await this.logModel.findById(id);
    if (!log) {
      throw new NotFoundException('Log not found');
    }
    log.content = content;
    return log.save();
  }

  async delete(id: string): Promise<void> {
    const log = await this.logModel.findById(id);
    if (!log) {
      throw new NotFoundException('Log not found');
    }
    await this.logModel.deleteOne({ _id: id }).exec();
  }
}
