import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';

@Controller('inventory')
@UseGuards(JwtAuthGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  async findAll(@Req() req) {
    console.log('User:', req.user); // For debugging
    return this.inventoryService.findAll();
  }

  @Post()
  async create(@Body() createInventoryItemDto: CreateInventoryItemDto) {
    return this.inventoryService.create(createInventoryItemDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateInventoryItemDto: CreateInventoryItemDto) {
    return this.inventoryService.update(id, updateInventoryItemDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.inventoryService.delete(id);
  }
}
