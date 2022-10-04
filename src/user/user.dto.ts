import { IsNotEmpty } from 'class-validator'
import { BaseDto } from '../config/base.dto'

export class UserDTO extends BaseDto {
  @IsNotEmpty()
    name!: string

  @IsNotEmpty()
    lastName!: string

  @IsNotEmpty()
    username!: 'string'

  @IsNotEmpty()
    email!: 'string'

  @IsNotEmpty()
    password!: string

  @IsNotEmpty()
    city!: string

  @IsNotEmpty()
    province!: string
}

export enum RoleType {
  USER = 'USER',
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN'
}
