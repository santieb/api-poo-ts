import { Request, Response } from 'express'
import { DeleteResult, UpdateResult } from 'typeorm'
import { HttpResponse } from '../shared/response/http.response'
import { UserService } from './user.service'

export class UserController {
  // eslint-disable-next-line
  constructor (
    private readonly userService : UserService = new UserService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getUsers (req: Request, res: Response) {
    try {
      const data = await this.userService.findAllUser()
      if (data.length === 0) return this.httpResponse.NotFound(res, 'Not exists')

      return this.httpResponse.Ok(res, data)
    } catch (err) {
      return this.httpResponse.Error(res, err)
    }
  }

  async getUserById (req: Request, res: Response) {
    const { id } = req.params
    try {
      const data = await this.userService.findUserById(id)
      if (!data) return this.httpResponse.NotFound(res, 'Not exists')

      return this.httpResponse.Ok(res, data)
    } catch (err) {
      return this.httpResponse.Error(res, err)
    }
  }

  async createUser (req: Request, res: Response) {
    try {
      const data = await this.userService.createUser(req.body)
      if (!data) return this.httpResponse.NotFound(res, 'Not exists')

      return this.httpResponse.Ok(res, data)
    } catch (err) {
      return this.httpResponse.Error(res, err)
    }
  }

  async updateUser (req: Request, res: Response) {
    const { id } = req.params
    try {
      const data: UpdateResult = await this.userService.updateUser(id, req.body)
      if (!data.affected) return this.httpResponse.NotFound(res, 'Update Error')

      return this.httpResponse.Ok(res, data)
    } catch (err) {
      return this.httpResponse.Error(res, err)
    }
  }

  async deleteUser (req: Request, res: Response) {
    const { id } = req.params
    try {
      const data: DeleteResult = await this.userService.deleteUser(id)
      if (!data.affected) return this.httpResponse.NotFound(res, 'Delete Error')

      return this.httpResponse.Ok(res, data)
    } catch (err) {
      return this.httpResponse.Error(res, err)
    }
  }
}
