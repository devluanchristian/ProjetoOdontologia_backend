import { Prisma } from '@prisma/client'
import { IMenuRepository } from '../menu-repository'
import { prisma } from '@/lib/prisma'

export class PrismaMenuRepository implements IMenuRepository {
  async create(data: Prisma.MenuCreateInput) {
    const menu = await prisma.menu.create({
      data,
    })
    return menu
  }

  async findById(sub_MenuId: number) {
    const menu = await prisma.menu.findUnique({
      where: { id: sub_MenuId },
    })
    return menu
  }
}
