import { Prisma, User } from '@prisma/client'
import { IUsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements IUsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-01',
      RA: null,
      users_TypesId: 'user-types',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
    }

    this.items.push(user)
    return user
  }
}
