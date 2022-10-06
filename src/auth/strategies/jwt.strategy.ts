import { PayloadToken } from '../interfaces/auth.interface'
import { ExtractJwt, Strategy as jwtStr, StrategyOptions } from 'passport-jwt'
import { AuthService } from '../services/auth.service'
import { PassportUse } from '../utils/passport.use'

export class JwtStrategy extends AuthService {
  // eslint-disable-next-line
  constructor() {
    super()
  }

  async validate (payload: PayloadToken, done: any) {
    return done(null, payload)
  }

  get use () {
    return PassportUse<jwtStr, StrategyOptions,
      (payload: PayloadToken, done: any) => Promise<PayloadToken>
        > (
        'jwt',
        jwtStr,
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: this.getEnvironment('JWT_SECRET')
        },
        this.validate
        )
  }
}
