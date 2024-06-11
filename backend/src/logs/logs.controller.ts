// C:\PROGRAMACIOM\erpConstruccion\erpConstruccion\backend\src\logs\logs.controller.ts
import { Controller, Post, Get, Body, Param, UseGuards, Request, Put, Delete } from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/logs')
@UseGuards(JwtAuthGuard)
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get(':itemId')
  async findByItemId(@Param('itemId') itemId: string) {
    return this.logsService.findByItemId(itemId);
  }

  @Post()
  async create(@Body() createLogDto: CreateLogDto, @Request() req) {
    const user = req.user;
    console.log('User:', user); // For debugging
    return this.logsService.create(createLogDto, user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body('content') content: string) {
    return this.logsService.update(id, content);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.logsService.delete(id);
  }
}
