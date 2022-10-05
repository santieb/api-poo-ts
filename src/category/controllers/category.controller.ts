import { Request, Response } from 'express'
import { DeleteResult, UpdateResult } from 'typeorm'
import { HttpResponse } from '../../shared/response/http.response'
import { CategoryService } from '../services/category.service'

export class CategoryController {
  // eslint-disable-next-line
  constructor (
    private readonly categoryservice : CategoryService = new CategoryService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getCategories (req: Request, res: Response) {
    try {
      const data = await this.categoryservice.findAllCategories()
      if (data.length === 0) return this.httpResponse.NotFound(res, 'Not exists')

      return this.httpResponse.Ok(res, data)
    } catch (err) {
      return this.httpResponse.Error(res, err)
    }
  }

  async getCategorytById (req: Request, res: Response) {
    const { id } = req.params
    try {
      const data = await this.categoryservice.findCategoryById(id)
      if (!data) return this.httpResponse.NotFound(res, 'Not exists')

      return this.httpResponse.Ok(res, data)
    } catch (err) {
      return this.httpResponse.Error(res, err)
    }
  }

  async createCategory (req: Request, res: Response) {
    try {
      const data = await this.categoryservice.createCategory(req.body)
      if (!data) return this.httpResponse.NotFound(res, 'Not exists')

      return this.httpResponse.Ok(res, data)
    } catch (err) {
      return this.httpResponse.Error(res, err)
    }
  }

  async updateCategory (req: Request, res: Response) {
    const { id } = req.params
    try {
      const data: UpdateResult = await this.categoryservice.updateCategory(id, req.body)
      if (!data.affected) return this.httpResponse.NotFound(res, 'Update Error')

      return this.httpResponse.Ok(res, data)
    } catch (err) {
      return this.httpResponse.Error(res, err)
    }
  }

  async deleteCategory (req: Request, res: Response) {
    const { id } = req.params
    try {
      const data: DeleteResult = await this.categoryservice.deleteCategory(id)
      if (!data.affected) return this.httpResponse.NotFound(res, 'Delete Error')

      return this.httpResponse.Ok(res, data)
    } catch (err) {
      return this.httpResponse.Error(res, err)
    }
  }
}
