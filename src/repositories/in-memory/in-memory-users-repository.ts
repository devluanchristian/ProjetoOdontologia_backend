import { Prisma, User } from '@prisma/client'
import { IUsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements IUsersRepository {
  public items: User[] = []
  async findbyEmail(email: string) {
    const user = this.items.find((item) => item.email === email)
    if (!user) {
      return null
    }
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-01',
      RA: null,
      date_create: new Date(),
      last_date_acess: null,
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
    }

    this.items.push(user)
    return user
  }
}
