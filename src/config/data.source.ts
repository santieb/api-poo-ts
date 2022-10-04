import * as dotenv from 'dotenv'
import { DataSourceOptions } from 'typeorm'
import path from 'path'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

dotenv.config({
  path: process.env.NODE_ENV !== undefined ?
    `.${process.env.NODE_ENV.trim()}.env` :
    '.env'
})

const Config: DataSourceOptions = {
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
