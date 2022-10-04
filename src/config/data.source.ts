import * as dotenv from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'
import path from 'path'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

dotenv.config({
  path: process.env.NODE_ENV
    ? `.${process.env.NODE_ENV.trim()}.env`
    : '.env'
})

const Config: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [path.join(__dirname, '/../**/*.entity{.js,.ts}')],
  migrations: [path.join(__dirname, '/../migrations/*{.js,.ts}')],
  migrationsRun: true,
  synchronize: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy()
}

export const AppDataSource: DataSource = new DataSource(Config)
