import { UserController } from './controllers/user.controller'
import { BaseRouter } from '../shared/router/router'
import { UserMiddleware } from './middlewares/user.middleware'

export class UserRouter extends BaseRouter <UserController, UserMiddleware> {
  constructor () {
    super(UserController, UserMiddleware)
  }

  routes (): void {
    this.router.get('/users', (req, res) =>
      this.controller.getUsers(req, res))

    this.router.get('/users/:id', (req, res) =>
      this.controller.getUserById(req, res))

    this.router.get('/usersRel/:id', (req, res) =>
      this.controller.getUserWithRelations(req, res))

    this.router.post('/createUser', (req, res, next) =>
      [this.middleware.userValidator(req, res, next)], (req, res) =>
      this.controller.createUser(req, res))

    this.router.patch('/updateUser/:id', (req, res) =>
      this.controller.updateUser(req, res))

    this.router.delete('/deleteUser/:id',
      this.middleware.passAuth('jwt'), (req, res, next) =>
        [this.middleware.checkAdminRole(req, res, next)], (req, res) =>
        this.controller.deleteUser(req, res))
  }
}
