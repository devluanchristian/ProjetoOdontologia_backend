import { Menu, Prisma } from '@prisma/client'

export interface IMenuRepository {
  create(data: Prisma.MenuCreateInput): Promise<Menu>
  findById(sub_MenuId: number): Promise<Menu | null>
}
