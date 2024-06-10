// C:\PROGRAMACIOM\erpConstruccion\erpConstruccion\backend\src\tasks\dto\update-task.dto.ts
import { IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsString()
  @IsOptional()
  readonly projectId?: string;

  @IsString()
  @IsOptional()
  readonly assignedTo?: string;

  @IsDateString()
  @IsOptional()
  readonly dueDate?: Date;
}
