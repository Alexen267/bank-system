import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
} from 'class-validator';

export class CreateAccountDto {
  @IsUUID()
  @IsNotEmpty()
  accountNo: string;

  @IsNumber()
  @IsPositive()
  balance: number;

  @IsBoolean()
  active: boolean;
}
