import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './schemas/project.schema';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async createProject(
    @Body()
    body: {
      name: string;
      description?: string;
      startDate?: Date;
      endDate?: Date;
    },
  ): Promise<Project> {
    return this.projectsService.createProject(
      body.name,
      body.description,
      body.startDate,
      body.endDate,
    );
  }

  @Get()
  async getAllProjects(): Promise<Project[]> {
    return this.projectsService.getAllProjects();
  }

  @Get(':id')
  async getProjectById(@Param('id') id: string): Promise<Project> {
    return this.projectsService.getProjectById(id);
  }

  @Put(':id')
  async updateProject(
    @Param('id') id: string,
    @Body() updateData: Partial<Project>,
  ): Promise<Project> {
    return this.projectsService.updateProject(id, updateData);
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string): Promise<Project> {
    return this.projectsService.deleteProject(id);
  }
}
