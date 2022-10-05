import { IsNotEmpty } from 'class-validator'
import { BaseDto } from '../../config/base.dto'

export class ProductDto extends BaseDto {
  @IsNotEmpty()
    productName!: string

  @IsNotEmpty()
    description!: string

  @IsNotEmpty()
    price!: number
}
