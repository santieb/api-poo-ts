import { IsNotEmpty, IsOptional } from 'class-validator'
import { BaseDto } from '../../config/base.dto'
import { ProductEntity } from '../../product/entities/product.entity'
import { PurchaseEntity } from '../entities/purchase.entity'

export class PurchaseProductDto extends BaseDto {
  @IsNotEmpty()
    quantityProduct!: number

  @IsOptional()
    totalPrice?: number

  @IsNotEmpty()
    purchase?: PurchaseEntity

  @IsNotEmpty()
    product?: ProductEntity
}
