// projects.controller.ts

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
import { CreateProjectDto } from './dto/create-project.dto'; // Importar el DTO

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async createProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.createProject(
      createProjectDto.name,
      createProjectDto.description,
      createProjectDto.startDate,
      createProjectDto.endDate,
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
