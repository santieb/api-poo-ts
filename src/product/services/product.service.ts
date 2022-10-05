import { BaseService } from '../../config/base.service'
import { DeleteResult, UpdateResult } from 'typeorm'
import { ProductEntity } from '../entities/product.entity'
import { ProductDto } from '../dto/product.dto'

export class ProductService extends BaseService<ProductEntity> {
  constructor () {
    super(ProductEntity)
  }

  async findAllProduct (category?: any): Promise<ProductEntity[]> {
    if (!category) return (await this.execRepository).find()

    return (await this.execRepository).createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('category.categoryName = :name', { name: category })
      .getMany()
  }

  async findProductById (id: string): Promise<ProductEntity | null> {
    return (await this.execRepository).createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .getOne()
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
