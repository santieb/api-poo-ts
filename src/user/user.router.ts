import { UserController } from './user.controller'
import { BaseRouter } from '../shared/router/router'

export class UserRouter extends BaseRouter <UserController> {
  constructor () {
    super(UserController)
  }

  routes (): void {
    this.router.get('/users', this.controller.getUsers)
  }
}
