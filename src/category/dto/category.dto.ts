import { IsNotEmpty } from 'class-validator'
import { BaseDto } from '../../config/base.dto'

export class CategoryDto extends BaseDto {
  @IsNotEmpty()
    categoryName!: string
}
