import { IMenuRepository } from '@/repositories/menu-repository'
import { Menu } from '@prisma/client'

interface IGetMenuUseCaseRequest {
  menuId: number
}

interface IGetMenuUseCaseResponse {
  menu: Menu
}

export class GetMenuUseCase {
  constructor(private menuRepository: IMenuRepository) {}

  async execute({
    menuId,
  }: IGetMenuUseCaseRequest): Promise<IGetMenuUseCaseResponse> {
    const menu = await this.menuRepository.findById(menuId)

    if (!menu) {
      throw new Error('Menu not found')
    }
    return {
      menu,
    }
  }
}
