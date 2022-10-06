import { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import { RoleType } from '../../user/dto/user.dto'
import { UserEntity } from '../../user/entities/user.entity'
import { HttpResponse } from '../response/http.response'

export class SharedMiddleware {
  // eslint-disable-next-line
  constructor(public httpResponse: HttpResponse = new HttpResponse()) {}

  passAuth (type: string) {
    return passport.authenticate(type, { session: false })
  }

  checkAdminRole (req: Request, res: Response, next: NextFunction) {
    const user = req.user as UserEntity
    console.log(user)
    if (user.role !== RoleType.ADMIN) return this.httpResponse.Unauthorized(res, 'You dont have permissions')

    return next()
  }
}
