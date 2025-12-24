import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ActionType } from 'src/common/enum/action-type';

export class CreateLogDto {
  @IsEnum(ActionType)
  @IsNotEmpty()
  action: ActionType;

  @IsString()
  @IsOptional()
  details?: string;

  @IsUUID()
  clientId: string;
}
