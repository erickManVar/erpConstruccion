// create-project.dto.ts

import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsDateString()
  @IsOptional()
  readonly startDate?: Date;

  @IsDateString()
  @IsOptional()
  readonly endDate?: Date;
}
