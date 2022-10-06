import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { SharedMiddleware } from '../../shared/middlewares/shared.middleware'
import { UserDTO } from '../dto/user.dto'

export class UserMiddleware extends SharedMiddleware {
  // eslint-disable-next-line
  constructor () {
    super()
  }

  userValidator (req: Request, res: Response, next: NextFunction) {
    const { name, lastName, username, email, password, city, province, role } = req.body

    const valid = new UserDTO()
    valid.name = name
    valid.lastName = lastName
    valid.username = username
    valid.email = email
    valid.password = password
    valid.city = city
    valid.province = province
    valid.role = role ?? 'USER'

    validate(valid)
      .then(err => {
        if (err.length > 0) {
          return this.httpResponse.Error(res, err)
        }
        next()
      })
  }
}
