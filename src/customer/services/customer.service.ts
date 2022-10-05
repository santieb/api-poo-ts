import { BaseService } from '../../config/base.service'
import { DeleteResult, UpdateResult } from 'typeorm'
import { CustomerEntity } from '../entities/customer.entity'
import { CustomerDto } from '../dto/customer.dto'

export class CustomerService extends BaseService<CustomerEntity> {
  constructor () {
    super(CustomerEntity)
  }

  async findAllCustomers (): Promise<CustomerEntity[]> {
    return (await this.execRepository).find()
  }

  async findCustomerById (id: string): Promise<CustomerEntity | null> {
    return (await this.execRepository).findOneBy({ id })
  }

  async createCustomer (body: CustomerDto): Promise<CustomerEntity> {
    return (await this.execRepository).save(body)
  }

  async updateCustomer (id: string, infoUpdate: CustomerDto): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate)
  }

  async deleteCustomer (id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id })
  }
}
