import {
  IsString,
  IsOptional,
  IsDateString,
  IsArray,
  IsNotEmpty,
  ValidateNested,
  IsNumber,
} from 'class-validator'

import { Type } from 'class-transformer'

export class ParticipantDto {
  @IsNotEmpty()
  streamerId: number

  @IsNumber()
  playHour: number
}

export class CreateTimelineDto {
  @IsOptional()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  description: string

  @IsDateString()
  date: Date

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ParticipantDto)
  participants: ParticipantDto[]
}
