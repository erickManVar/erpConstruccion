// create-inventory-item.dto.ts
import { IsString, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';
import { Category, MeasurementUnit } from '../schemas/inventory.schema';

export class CreateInventoryItemDto {
  @IsString()
  @IsNotEmpty()
  itemCode: string;

  @IsString()
  @IsNotEmpty()
  itemName: string;  // New property for item name

  @IsEnum(Category)
  category: Category;

  @IsString()
  @IsNotEmpty()
  storage: string; // Changed to string to store project names

  @IsString()
  @IsNotEmpty()
  entryDate: string;

  @IsEnum(MeasurementUnit)
  measurementUnit: MeasurementUnit; // Updated to use MeasurementUnit enum

  @IsNumber()
  unitPrice: number;

  @IsNumber()
  quantity: number; // New property for quantity

  @IsNumber()
  totalPrice: number; // Automatically calculated from unitPrice and quantity

  @IsString()
  observations: string;

  @IsString()
  @IsNotEmpty()
  projectName: string;

  @IsString()
  @IsNotEmpty()
  deliveredTo: string; // New property to store the name of the user

  @IsNumber()
  @IsNotEmpty()
  totalProjectAmount: number; // New property for the total project amount
}
