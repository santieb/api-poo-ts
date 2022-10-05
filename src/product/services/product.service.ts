import { BaseService } from '../../config/base.service'
import { DeleteResult, UpdateResult } from 'typeorm'
import { ProductEntity } from '../entities/product.entity'
import { ProductDto } from '../dto/product.dto'

export class ProductService extends BaseService<ProductEntity> {
  constructor () {
    super(ProductEntity)
  }

  async findAllProduct (): Promise<ProductEntity[]> {
    return (await this.execRepository).find()
  }

  async findProductById (id: string): Promise<ProductEntity | null> {
    return (await this.execRepository).findOneBy({ id })
  }

  async createProduct (body: ProductDto): Promise<ProductEntity> {
    return (await this.execRepository).save(body)
  }

  async updateProduct (id: string, infoUpdate: ProductDto): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate)
  }

  async deleteProduct (id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id })
  }
}
