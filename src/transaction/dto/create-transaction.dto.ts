import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { TransactionType } from 'src/common/enum/transactionEnum';

export class CreateTransactionDto {
  @IsEnum(TransactionType)
  transactionType: TransactionType;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsOptional()
  @MinLength(125)
  description?: string;

  @IsUUID()
  @IsNotEmpty()
  sourceAccountNo: string;

  @IsUUID()
  @IsOptional()
  destinationAccountNo: string;
}
