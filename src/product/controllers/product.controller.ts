import { Request, Response } from 'express'
import { DeleteResult, UpdateResult } from 'typeorm'
import { HttpResponse } from '../../shared/response/http.response'
import { ProductService } from '../services/product.service'

export class ProductController {
  // eslint-disable-next-line
  constructor (
    private readonly productService : ProductService = new ProductService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getProducts (req: Request, res: Response) {
    try {
      const { category } = req.query

      const data = await this.productService.findAllProduct(category)
      if (data.length === 0) return this.httpResponse.NotFound(res, 'Not exists')

      return this.httpResponse.Ok(res, data)
    } catch (err) {
      return this.httpResponse.Error(res, err)
    }
  }

  async getProductById (req: Request, res: Response) {
    const { id } = req.params
    try {
      const data = await this.productService.findProductById(id)
      if (!data) return this.httpResponse.NotFound(res, 'Not exists')

      return this.httpResponse.Ok(res, data)
    } catch (err) {
      return this.httpResponse.Error(res, err)
    }
  }

  async createProduct (req: Request, res: Response) {
    try {
      const data = await this.productService.createProduct(req.body)
      if (!data) return this.httpResponse.NotFound(res, 'Not exists')

      return this.httpResponse.Ok(res, data)
    } catch (err) {
      return this.httpResponse.Error(res, err)
    }
  }

  async updateProduct (req: Request, res: Response) {
    const { id } = req.params
    try {
      const data: UpdateResult = await this.productService.updateProduct(id, req.body)
      if (!data.affected) return this.httpResponse.NotFound(res, 'Update Error')

      return this.httpResponse.Ok(res, data)
    } catch (err) {
      return this.httpResponse.Error(res, err)
    }
  }

  async deleteProduct (req: Request, res: Response) {
    const { id } = req.params
    try {
      const data: DeleteResult = await this.productService.deleteProduct(id)
      if (!data.affected) return this.httpResponse.NotFound(res, 'Delete Error')

      return this.httpResponse.Ok(res, data)
    } catch (err) {
      return this.httpResponse.Error(res, err)
    }
  }
}
