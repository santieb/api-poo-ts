import { BaseService } from '../../config/base.service'
import { UserEntity } from '../entities/user.entity'
import { UserDTO } from '../dto/user.dto'
import { DeleteResult, UpdateResult } from 'typeorm'

export class UserService extends BaseService<UserEntity> {
  constructor () {
    super(UserEntity)
  }

  async findAllUser (): Promise<UserEntity[]> {
    return (await this.execRepository).find()
  }

  async findUserById (id: string): Promise<UserEntity | null> {
    return (await this.execRepository).findOneBy({ id })
  }

  async findUserWithRelation (id: string): Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.customer', 'customer')
      .where({ id })
      .getOne()
  }

  async createUser (body: UserDTO): Promise<UserEntity> {
    return (await this.execRepository).save(body)
  }

  async updateUser (id: string, infoUpdate: UserDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate)
  }

  async deleteUser (id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id })
  }
}
