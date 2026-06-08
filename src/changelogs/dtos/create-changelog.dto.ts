import { IsEnum, IsNotEmpty, IsString, IsDateString } from 'class-validator'

import { ChangelogTypeUnion } from '../types/changelog'

export class CreateChangelogDto {
  @IsEnum(['ADD', 'FIX'])
  type: ChangelogTypeUnion

  @IsString()
  @IsNotEmpty()
  description: string

  @IsDateString()
  date: Date
}
