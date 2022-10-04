import { IsOptional } from 'class-validator'
import { IsDate, IsUUID } from 'class-validator/types/decorator/decorators'

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
