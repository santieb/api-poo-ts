import { BaseService } from '../../config/base.service'
import { DeleteResult, UpdateResult } from 'typeorm'
import { CategoryEntity } from '../entities/category.entity'
import { CategoryDto } from '../dto/category.dto'

export class CategoryService extends BaseService<CategoryEntity> {
  constructor () {
    super(CategoryEntity)
  }

  async findAllCategories (): Promise<CategoryEntity[]> {
    return (await this.execRepository).find()
  }

  async findCategoryById (id: string): Promise<CategoryEntity | null> {
    return (await this.execRepository).findOneBy({ id })
  }

  async createCategory (body: CategoryDto): Promise<CategoryEntity> {
    return (await this.execRepository).save(body)
  }

  async updateCategory (id: string, infoUpdate: CategoryDto): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate)
  }

  async deleteCategory (id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id })
  }
}
