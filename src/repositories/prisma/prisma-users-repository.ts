import { Prisma } from '@prisma/client'
import { IUsersRepository } from '../users-repository'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const users = await prisma.user.create({
      data,
    })
    return users
  }
}
