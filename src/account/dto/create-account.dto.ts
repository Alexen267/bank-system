import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';

export class CreateAccountDto {
  @IsUUID()
  @IsOptional()
  accountNo: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  balance: number;

  @IsBoolean()
  @IsOptional()
  active: boolean;
}
