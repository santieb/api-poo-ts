import { ConfigServer } from '../../config/config'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { UserService } from '../../user/services/user.service'
import { UserEntity } from '../../user/entities/user.entity'
import { PayloadToken } from '../interfaces/auth.interface'

export class AuthService extends ConfigServer {
  constructor (
    private readonly userService: UserService = new UserService(),
    private readonly jwtInstance = jwt
  ) {
    super()
  }

  public async validateUser (user: string, password: string)
  : Promise<UserEntity | null> {
    const userByEmail = await this.userService.findUserByEmail(user)
    const userByUsername = await this.userService.findUserByUsername(user)

    if (userByEmail) {
      const isMatch = await bcrypt.compare(password, userByEmail.password)
      if (isMatch) return userByEmail
    }

    if (userByUsername) {
      const isMatch = await bcrypt.compare(password, userByUsername.password)
      if (isMatch) return userByUsername
    }

    return null
  }

  sign (payload: jwt.JwtPayload, secret: any) {
    return this.jwtInstance.sign(payload, secret)
  }

  public async generateJWT (user: UserEntity)
    : Promise<{ accessToken: string, user: UserEntity }> {
    const { id, role } = user
    const userConsult = await this.userService.findUserByRole(id, role)

    const payload: PayloadToken = {
      role: userConsult!.role,
      sub: userConsult!.id
    }

    if (userConsult) user.password = 'Not permission'

    return {
      accessToken: this.sign(payload, this.getEnvironment('JWT_SECRET')),
      user
    }
  }
}
