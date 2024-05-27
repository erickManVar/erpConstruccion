import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async createProject(
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Project> {
    const newProject = new this.projectModel({
      name,
      description,
      startDate,
      endDate,
    });
    return newProject.save();
  }

  async getAllProjects(): Promise<Project[]> {
    return this.projectModel.find().lean().exec();
  }

  async getProjectById(id: string): Promise<Project | null> {
    return this.projectModel.findById(id).lean().exec();
  }

  async updateProject(
    id: string,
    updateData: Partial<Project>,
  ): Promise<Project | null> {
    return this.projectModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .lean()
      .exec();
  }

  async deleteProject(id: string): Promise<Project | null> {
    return this.projectModel.findByIdAndDelete(id).lean().exec();
  }
}
