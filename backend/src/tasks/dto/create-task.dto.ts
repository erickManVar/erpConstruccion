// C:\PROGRAMACIOM\erpConstruccion\erpConstruccion\backend\src\tasks\dto\create-task.dto.ts
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  readonly description?: string;

  @IsString()
  @IsNotEmpty()
  readonly projectId: string;

  @IsString()
  @IsNotEmpty()
  readonly assignedTo: string;

  @IsDateString()
  @IsNotEmpty()
  readonly dueDate: Date;
}
