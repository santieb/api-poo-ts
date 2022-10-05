import { IsNotEmpty } from 'class-validator'
import { BaseDto } from '../../config/base.dto'
import { CustomerEntity } from '../../customer/entities/customer.entity'

export class PurchaseDto extends BaseDto {
  @IsNotEmpty()
    status!: string

  @IsNotEmpty()
    paymentMethod!: string

  @IsNotEmpty()
    customer!: CustomerEntity
}
