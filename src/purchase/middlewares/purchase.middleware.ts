import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { HttpResponse } from '../../shared/response/http.response'
import { PurchaseDto } from '../dto/purchase.dto'

export class PurchaserMiddleware {
  // eslint-disable-next-line
  constructor (private httpResponse: HttpResponse = new HttpResponse) {}

  purchaseValidator (req: Request, res: Response, next: NextFunction) {
    const { customer, paymentMethod, status } = req.body

    const valid = new PurchaseDto()
    valid.customer = customer
    valid.paymentMethod = paymentMethod
    valid.status = status

    validate(valid).then(err => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err)
      }
      next()
    })
  }
}
