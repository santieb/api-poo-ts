import { Request, Response } from 'express'
import { DeleteResult, UpdateResult } from 'typeorm'
import { HttpResponse } from '../../shared/response/http.response'
import { PurchaseService } from '../services/purchase.service'

export class PurchaseController {
  // eslint-disable-next-line
  constructor (
    private readonly purchaseService : PurchaseService = new PurchaseService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getPurchases (req: Request, res: Response) {
    try {
      const data = await this.purchaseService.findAllPurchases()
      if (data.length === 0) return this.httpResponse.NotFound(res, 'Not exists')

      return this.httpResponse.Ok(res, data)
    } catch (err) {
      return this.httpResponse.Error(res, err)
    }
  }

  async getPurchaseById (req: Request, res: Response) {
    const { id } = req.params
    try {
      const data = await this.purchaseService.findPurchaseById(id)
      if (!data) return this.httpResponse.NotFound(res, 'Not exists')

      return this.httpResponse.Ok(res, data)
    } catch (err) {
      return this.httpResponse.Error(res, err)
    }
  }

  async createPurchase (req: Request, res: Response) {
    try {
      const data = await this.purchaseService.createPurchase(req.body)
      if (!data) return this.httpResponse.NotFound(res, 'Not exists')

      return this.httpResponse.Ok(res, data)
    } catch (err) {
      return this.httpResponse.Error(res, err)
    }
  }

  async updatePurchase (req: Request, res: Response) {
    const { id } = req.params
    try {
      const data: UpdateResult = await this.purchaseService.updatePurchase(id, req.body)
      if (!data.affected) return this.httpResponse.NotFound(res, 'Update Error')

      return this.httpResponse.Ok(res, data)
    } catch (err) {
      return this.httpResponse.Error(res, err)
    }
  }

  async deletePurchase (req: Request, res: Response) {
    const { id } = req.params
    try {
      const data: DeleteResult = await this.purchaseService.deletePurchase(id)
      if (!data.affected) return this.httpResponse.NotFound(res, 'Delete Error')

      return this.httpResponse.Ok(res, data)
    } catch (err) {
      return this.httpResponse.Error(res, err)
    }
  }
}
