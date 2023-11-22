import { PrismaMenuRepository } from '@/repositories/prisma/prisma-menu-repositoy'
import { CreateMenuUseCase } from '@/use-cases/create_menu-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function createMenu(request: FastifyRequest, reply: FastifyReply) {
  const createMenuBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    sub_MenuId: z.number(),
  })

  const { title, description, image, sub_MenuId } = createMenuBodySchema.parse(
    request.body,
  )

  try {
    const menuRepository = new PrismaMenuRepository()
    const createMenuUseCase = new CreateMenuUseCase(menuRepository)
    const { menu } = await createMenuUseCase.execute({
      title,
      description,
      image,
      sub_MenuId,
    })

    reply.status(200).send({ menu })
  } catch (error) {
    return reply.status(400).send({ error })
  }
}
