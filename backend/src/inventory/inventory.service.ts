import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InventoryItem, InventoryItemDocument } from './schemas/inventory.schema';
import { CreateInventoryItemDto } from './dto/create-inventory-item.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(InventoryItem.name) private inventoryModel: Model<InventoryItemDocument>,
  ) {}

  async findAll(): Promise<InventoryItem[]> {
    return this.inventoryModel.find().exec();
  }

  async findByProject(projectName: string): Promise<InventoryItem[]> {
    return this.inventoryModel.find({ projectName }).exec();
  }

  async create(createInventoryItemDto: CreateInventoryItemDto): Promise<InventoryItem> {
    const itemCode = await this.getNextItemCode(createInventoryItemDto.projectName);
    const createdItem = new this.inventoryModel({
      ...createInventoryItemDto,
      itemCode,
    });
    return createdItem.save();
  }

  async update(id: string, updateInventoryItemDto: CreateInventoryItemDto): Promise<InventoryItem> {
    const existingItem = await this.inventoryModel.findByIdAndUpdate(id, updateInventoryItemDto, { new: true }).exec();
    if (!existingItem) {
      throw new NotFoundException(`Inventory item with ID ${id} not found`);
    }
    return existingItem;
  }

  async delete(id: string): Promise<void> {
    const result = await this.inventoryModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Inventory item with ID ${id} not found`);
    }
  }

  async getNextItemCode(projectName: string): Promise<string> {
    const items = await this.inventoryModel.find({ projectName }).sort({ itemCode: -1 }).exec();
    if (items.length === 0) {
      return projectName === 'Oficina Lima' ? '01-001' : '02-001';
    }
    const lastItemCode = items[0].itemCode;
    const [prefix, code] = lastItemCode.split('-');
    const nextCode = (parseInt(code, 10) + 1).toString().padStart(3, '0');
    return `${prefix}-${nextCode}`;
  }
}
