import { IMenuRepository } from '@/repositories/menu-repository'
import { Menu } from '@prisma/client'

interface IGetMenuUseCaseRequest {
  sub_MenuId: number
}

interface IGetMenuUseCaseResponse {
  menu: Menu
}

export class GetMenuUseCase {
  constructor(private menuRepository: IMenuRepository) {}

  async execute({
    sub_MenuId,
  }: IGetMenuUseCaseRequest): Promise<IGetMenuUseCaseResponse> {
    const menu = await this.menuRepository.findById(sub_MenuId)

    if (!menu) {
      throw new Error('Menu not found')
    }
    return {
      menu,
    }
  }
}
