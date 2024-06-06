import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';
import { InventoryItem } from './schemas/inventory.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('inventory')
@UseGuards(JwtAuthGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  async findAll(): Promise<InventoryItem[]> {
    return this.inventoryService.findAll();
  }

  @Get('project/:projectName')
  async findByProject(@Param('projectName') projectName: string): Promise<InventoryItem[]> {
    return this.inventoryService.findByProject(projectName);
  }

  @Post()
  async create(@Body() createInventoryItemDto: CreateInventoryItemDto): Promise<InventoryItem> {
    return this.inventoryService.create(createInventoryItemDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createInventoryItemDto: CreateInventoryItemDto,
  ): Promise<InventoryItem> {
    return this.inventoryService.update(id, createInventoryItemDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.inventoryService.delete(id);
  }

  @Get('nextItemCode/:projectName')
  async getNextItemCode(@Param('projectName') projectName: string): Promise<{ itemCode: string }> {
    const itemCode = await this.inventoryService.getNextItemCode(projectName);
    return { itemCode };
  }
}
