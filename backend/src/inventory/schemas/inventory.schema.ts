// inventory.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Category {
  CASCO = 'Casco',
  ACABADO = 'Acabado',
  POR_LLEGAR = 'Por llegar',
}

export enum MeasurementUnit {
  KG = 'kg',
  M3 = 'm³',
  M = 'm',
  UNIT = 'unit',
}

@Schema()
export class InventoryItem {
  @Prop({ required: true })
  itemCode: string;

  @Prop({ required: true })
  itemName: string;  // New property for item name

  @Prop({ required: true, enum: Category })
  category: Category;

  @Prop({ required: true })
  storage: string;  // Changed to string to store project names

  @Prop({ required: true })
  entryDate: Date;

  @Prop({ required: true, enum: MeasurementUnit })
  measurementUnit: MeasurementUnit;  // Enum for unit of measurement

  @Prop({ required: true })
  unitPrice: number;

  @Prop({ required: true })
  quantity: number;  // New property for quantity

  @Prop({ required: true })
  totalPrice: number;  // Automatically calculated from unitPrice and quantity

  @Prop()
  observations: string;

  @Prop({ required: true })
  projectName: string;

  @Prop({ required: true })
  deliveredTo: string;  // New property to store the name of the user

  @Prop({ required: true })
  totalProjectAmount: number;  // New property for the total project amount
}

export type InventoryItemDocument = InventoryItem & Document;

export const InventoryItemSchema = SchemaFactory.createForClass(InventoryItem);
