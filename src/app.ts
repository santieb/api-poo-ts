import 'reflect-metadata'
import 'dotenv'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { UserRouter } from './router/user.router'
import { ConfigServer } from './config/config'
import { DataSource } from 'typeorm'

class ServerBootstrap extends ConfigServer {
  private app: express.Application = express()
  private port: number = this.getNumberEnv('PORT')

  constructor () {
    super()
    this.dbConnect()

    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(morgan('dev'))
    this.app.use(cors())

    this.app.use('/api', this.routers())
    this.listen()
  }

  routers (): Array<express.Router> {
    return [new UserRouter().router]
  }

  async dbConnect (): Promise<DataSource> {
    return await new DataSource(this.typeOrmConfig).initialize()
  }

  private listen () {
    this.app.listen(this.port, () =>
      console.log(`Server listening on port => ${this.port}`))
  }
}

new ServerBootstrap()
