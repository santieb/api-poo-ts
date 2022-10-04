import * as dotenv from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'
import path from 'path'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export abstract class ConfigServer {
  constructor () {
    const nodeNameEnv = this.createPathEnv(this.nodeEnv)
    dotenv.config({
      path: nodeNameEnv
    })
  }

  public getEnvironment (x: string) {
    return process.env[x]
  }

  public getNumberEnv (k: string):number {
    return Number(this.getEnvironment(k))
  }

  public get nodeEnv ():string {
    return this.getEnvironment('NODE_ENV')?.trim() || ''
  }

  public createPathEnv (path:string):string {
    const arrEnv: string[] = ['env']

    if (path.length > 0) {
      const stringToArray = path.split('.')
      arrEnv.unshift(...stringToArray)
    }

    return '.' + arrEnv.join('.')
  }

  public get typeOrmConfig (): DataSourceOptions {
    return {
      type: 'mysql',
      host: this.getEnvironment('DB_HOST'),
      port: this.getNumberEnv('DB_PORT'),
      username: this.getEnvironment('DB_USER'),
      password: this.getEnvironment('DB_PASSWORD'),
      database: this.getEnvironment('DB_DATABASE'),
      entities: [path.join(__dirname, '/../**/*.entity{.js,.ts}')],
      migrations: [path.join(__dirname, '/../../migrations/*{.js,.ts}')],
      synchronize: false,
      logging: false,
      namingStrategy: new SnakeNamingStrategy()
    }
  }

  async dbConnect (): Promise<DataSource> {
    return await new DataSource(this.typeOrmConfig).initialize()
  }
}
