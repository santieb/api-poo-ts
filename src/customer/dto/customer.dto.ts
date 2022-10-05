import { IsNotEmpty } from 'class-validator'
import { BaseDto } from '../../config/base.dto'
import { UserEntity } from '../../user/entities/user.entity'

export class CustomerDto extends BaseDto {
  @IsNotEmpty()
    address!: string

  @IsNotEmpty()
    dni!: number

  @IsNotEmpty()
    user!: UserEntity
}
