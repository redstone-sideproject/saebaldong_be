import {
  IsEnum,
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
} from 'class-validator'
import { ChangelogTypeUnion } from '@src/changelogs/types/changelog'

export class UpdateChangelogDto {
  @IsEnum(['ADD', 'FIX'])
  @IsOptional()
  type?: ChangelogTypeUnion

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string

  @IsDateString()
  @IsOptional()
  date?: Date
}
