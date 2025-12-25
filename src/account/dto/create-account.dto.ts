import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';

export class CreateAccountDto {
  @IsUUID()
  @IsOptional()
  accountNo?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  balance?: number;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
