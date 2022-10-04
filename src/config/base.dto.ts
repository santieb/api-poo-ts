import { IsDate, IsOptional, IsUUID } from 'class-validator'

export abstract class BaseDto {
  @IsUUID()
  @IsOptional()
    id!: string

  @IsDate()
  @IsOptional()
    createdAt!: Date

  @IsDate()
  @IsOptional()
    updatedAt!: Date
}
