import { IMenuRepository } from '@/repositories/menu-repository'
import { Menu } from '@prisma/client'

interface ICreateMenuUseCaseRequest {
  title: string
  description?: string
  typeImage?: string
  image?: string
  sub_MenuId?: number
}
interface ICreateMenuUseCaseResponse {
  menu: Menu
}

export class CreateMenuUseCase {
  constructor(private menuRepository: IMenuRepository) {}

  async execute({
    title,
    description,
    image,
    typeImage,
    sub_MenuId,
  }: ICreateMenuUseCaseRequest): Promise<ICreateMenuUseCaseResponse> {
    const menu = await this.menuRepository.create({
      title,
      description,
      image,
      typeImage,
      sub_MenuId,
    })
    return { menu }
  }
}
