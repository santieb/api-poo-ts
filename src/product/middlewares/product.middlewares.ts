import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { HttpResponse } from '../../shared/response/http.response'
import { ProductDto } from '../dto/product.dto'

export class ProductMiddleware {
  // eslint-disable-next-line
  constructor (private httpResponse: HttpResponse = new HttpResponse) {}

  productValidator (req: Request, res: Response, next: NextFunction) {
    const { category, description, productName, price } = req.body

    const valid = new ProductDto()
    valid.category = category
    valid.description = description
    valid.productName = productName
    valid.price = price

    validate(valid).then(err => {
      if (err.length > 0) {
        return this.httpResponse.Error(res, err)
      }
      next()
    })
  }
}
