import { BaseService } from '../../config/base.service'
import { DeleteResult, UpdateResult } from 'typeorm'
import { PurchaseProductEntity } from '../entities/purchases-products.entity'
import { ProductService } from '../../product/services/product.service'
import { PurchaseProductDto } from '../dto/purchases-products.dto'

export class PurchaseProductService extends BaseService<PurchaseProductEntity> {
  constructor (private readonly productService: ProductService = new ProductService()) {
    super(PurchaseProductEntity)
  }

  async findAllPurchaseProduct (): Promise<PurchaseProductEntity[]> {
    return (await this.execRepository).find()
  }

  async findPurchaseProductById (id: string): Promise<PurchaseProductEntity | null> {
    return (await this.execRepository).findOneBy({ id })
  }

  async createPurchaseProduct (body: PurchaseProductDto): Promise<PurchaseProductEntity> {
    const newPP = (await this.execRepository).create(body)
    const product = await this.productService.findProductById(newPP.product.id)
    newPP.totalPrice = newPP.quantityProduct * product!.price

    return (await this.execRepository).save(newPP)
  }

  async updatePurchaseProduct (id: string, infoUpdate: PurchaseProductDto): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate)
  }

  async deletePurchaseProduct (id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id })
  }
}
