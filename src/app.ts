import 'reflect-metadata'
import 'dotenv'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { UserRouter } from './user/user.router'
import { ConfigServer } from './config/config'
import { DataSource } from 'typeorm'
import { ProductRouter } from './product/product.router'
import { CategorytRouter } from './category/category.router'
import { CustomerRouter } from './customer/customer.router'
import { PurchaseRoutes } from './purchase/purchase.router'
import { PurchaseProductRoutes } from './purchase/purchase-product.router'
import { LoginStrategy } from './auth/strategies/login.strategy'
import { JwtStrategy } from './auth/strategies/jwt.strategy'
import { AuthRouter } from './auth/auth.router'

class ServerBootstrap extends ConfigServer {
  private app: express.Application = express()
  private port: number = this.getNumberEnv('PORT')

  constructor () {
    super()

    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.passportUse()
    this.dbConnect()
    this.app.use(morgan('dev'))
    this.app.use(cors())

    this.app.use('/api', this.routers())
    this.listen()
  }

  async dbConnect (): Promise<DataSource | void> {
    return this.initConnect
      .then(() => console.log('Connect Sucess'))
      .catch(err => console.error(err))
  }

  routers (): Array<express.Router> {
    return [
      new UserRouter().router,
      new ProductRouter().router,
      new CategorytRouter().router,
      new CustomerRouter().router,
      new PurchaseRoutes().router,
      new PurchaseProductRoutes().router,
      new AuthRouter().router
    ]
  }

  passportUse () {
    return [
      new LoginStrategy().use,
      new JwtStrategy().use
    ]
  }

  private listen () {
    this.app.listen(this.port, () =>
      console.log(`Server listening on port => ${this.port}`))
  }
}

new ServerBootstrap()
