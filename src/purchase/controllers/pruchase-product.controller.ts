import { Request, Response } from 'express'
import { DeleteResult, UpdateResult } from 'typeorm'
import { HttpResponse } from '../../shared/response/http.response'
import { PurchaseProductService } from '../services/purchase-product.service'

export class PurchaseProductController {
  // eslint-disable-next-line
  constructor (
    private readonly purchaseProductService : PurchaseProductService = new PurchaseProductService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getPurchasesProducts (req: Request, res: Response) {
    try {
      const data = await this.purchaseProductService.findAllPurchaseProduct()
      if (data.length === 0) return this.httpResponse.NotFound(res, 'Not exists')

      return this.httpResponse.Ok(res, data)
    } catch (err) {
      return this.httpResponse.Error(res, err)
    }
  }

  async getPurchaseProductById (req: Request, res: Response) {
    const { id } = req.params
    try {
      const data = await this.purchaseProductService.findPurchaseProductById(id)
      if (!data) return this.httpResponse.NotFound(res, 'Not exists')

      return this.httpResponse.Ok(res, data)
    } catch (err) {
      return this.httpResponse.Error(res, err)
    }
  }

  async createPurchaseProduct (req: Request, res: Response) {
    try {
      const data = await this.purchaseProductService.createPurchaseProduct(req.body)
      if (!data) return this.httpResponse.NotFound(res, 'Not exists')

      return this.httpResponse.Ok(res, data)
    } catch (err) {
      return this.httpResponse.Error(res, err)
    }
  }

  async updatePurchaseProduct (req: Request, res: Response) {
    const { id } = req.params
    try {
      const data: UpdateResult = await this.purchaseProductService.updatePurchaseProduct(id, req.body)
      if (!data.affected) return this.httpResponse.NotFound(res, 'Update Error')

      return this.httpResponse.Ok(res, data)
    } catch (err) {
      return this.httpResponse.Error(res, err)
    }
  }

  async deletePurchaseProduct (req: Request, res: Response) {
    const { id } = req.params
    try {
      const data: DeleteResult = await this.purchaseProductService.deletePurchaseProduct(id)
      if (!data.affected) return this.httpResponse.NotFound(res, 'Delete Error')

      return this.httpResponse.Ok(res, data)
    } catch (err) {
      return this.httpResponse.Error(res, err)
    }
  }
}
