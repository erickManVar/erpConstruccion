// C:\PROGRAMACIOM\erpConstruccion\erpConstruccion\backend\src\users\dto\update-user.dto.ts
import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  readonly password?: string;

  @IsString()
  @IsOptional()
  readonly role?: string;
}
